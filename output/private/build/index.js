"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['replit.app', 'replit.dev']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                'content': '内容',
                'author': '作者',
                'title': '标题',
                'source': '来源',
                'time': '时间',
                'zoom': '图片质量',
                'contentPlaceholder': '请选择内容字段',
                'authorPlaceholder': '请选择作者字段',
                'titlePlaceholder': '请选择标题字段',
                'sourcePlaceholder': '请选择来源字段',
                'timePlaceholder': '请选择时间字段',
                'css_selectorPlaceholder': '请选择卡片主题',
                'zoomPlaceholder': '请选择图片质量，质量越高生成时间越长'
            },
            'en-US': {
                'create_time': 'Creation Time',
                'start_datetime': 'Start Date',
                'placeholderStartDate': 'Select Start Date',
                'date1': 'Review Date 1',
                'date2': 'Review Date 2',
                'date3': 'Review Date 3',
                'date4': 'Review Date 4',
                'date5': 'Review Date 5',
            },
            'ja-JP': {
                'create_time': '作成時間',
                'start_datetime': '開始日',
                'placeholderStartDate': '開始日を選択してください',
                'date1': '復習日1',
                'date2': '復習日2',
                'date3': '復習日3',
                'date4': '復習日4',
                'date5': '復習日5',
            },
        }
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'content',
            label: t('contentPlaceholder'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('contentPlaceholder'),
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            },
            tooltips: [
                {
                    type: 'link',
                    text: '点击查看说明文档',
                    'link': 'https://jfsq6znqku.feishu.cn/wiki/IGZFwmBiJiIh7AkoxHscoZA7nLg?fromScene=spaceOverview&table=tblTNYmVWJOV32w9&view=vewsmuEYuU'
                }
            ]
        },
        {
            key: 'author',
            label: t('authorPlaceholder'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('authorPlaceholder'),
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: false,
            }
        },
        {
            key: 'title',
            label: t('titlePlaceholder'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('titlePlaceholder'),
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: false,
            }
        },
        {
            key: 'source',
            label: t('sourcePlaceholder'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('sourcePlaceholder'),
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: false,
            }
        },
        {
            key: 'time',
            label: t('timePlaceholder'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('timePlaceholder'),
                supportType: [block_basekit_server_api_1.FieldType.DateTime],
            },
            validator: {
                required: false,
            }
        },
        {
            key: 'css_selector',
            label: t('css_selectorPlaceholder'),
            component: block_basekit_server_api_1.FieldComponent.Radio,
            props: {
                options: [
                    { label: '梦幻晨曦', value: '1' },
                    { label: '墨染夜空', value: '2' },
                    { label: '炫彩日落', value: '3' },
                    { label: '海天幻境', value: '4' },
                    { label: '朦胧灰雾', value: '5' },
                ]
            },
            tooltips: [
                {
                    type: 'link',
                    text: '点击查看说明文档',
                    'link': 'https://jfsq6znqku.feishu.cn/wiki/IGZFwmBiJiIh7AkoxHscoZA7nLg?fromScene=spaceOverview&table=tblTNYmVWJOV32w9&view=vewsmuEYuU'
                }
            ],
            validator: {
                required: true,
            }
        },
        {
            key: 'zoom',
            label: t('zoomPlaceholder'),
            component: block_basekit_server_api_1.FieldComponent.Radio,
            props: {
                options: [
                    { label: '低', value: '1' },
                    { label: '较低', value: '2' },
                    { label: '一般', value: '3' },
                    { label: '较高', value: '4' },
                    { label: '最高', value: '5' },
                ]
            },
            validator: {
                required: true, // 必填项
                minItems: 1, // 最小值为1
                maxItems: 5, // 最大值为5
            }
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Attachment
    },
    execute: async (formItemParams, context) => {
        let { content, author, title, source, time, css_selector, zoom } = formItemParams;
        function extractText(items) {
            return (items || []).map(item => item.text).join('');
        }
        content = extractText(content);
        let name = extractText(author);
        title = extractText(title);
        source = extractText(source);
        time = Number(time) / 1000;
        css_selector = css_selector.value;
        zoom = zoom.value;
        console.log(content);
        const params = {
            content,
            name,
            title,
            source,
            time,
            css_selector,
            zoom
        };
        try {
            const res = await context.fetch(`https://generate-share-card-backend-wuyi.replit.app/generate_card`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }).then(res => res.json());
            console.log(res);
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: [
                    {
                        "name": res.name, // 附件名称,需要带有文件格式后缀
                        "content": res.src,
                        "contentType": "attachment/url", // 固定值
                    }
                ]
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFFcEQsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNMLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2dCQUNkLG9CQUFvQixFQUFFLFNBQVM7Z0JBQy9CLG1CQUFtQixFQUFFLFNBQVM7Z0JBQzlCLGtCQUFrQixFQUFFLFNBQVM7Z0JBQzdCLG1CQUFtQixFQUFFLFNBQVM7Z0JBQzlCLGlCQUFpQixFQUFFLFNBQVM7Z0JBQzVCLHlCQUF5QixFQUFFLFNBQVM7Z0JBQ3BDLGlCQUFpQixFQUFFLG9CQUFvQjthQUMxQztZQUNELE9BQU8sRUFBRTtnQkFDTCxhQUFhLEVBQUUsZUFBZTtnQkFDOUIsZ0JBQWdCLEVBQUUsWUFBWTtnQkFDOUIsc0JBQXNCLEVBQUUsbUJBQW1CO2dCQUMzQyxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixPQUFPLEVBQUUsZUFBZTtnQkFDeEIsT0FBTyxFQUFFLGVBQWU7YUFDM0I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsYUFBYSxFQUFFLE1BQU07Z0JBQ3JCLGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLHNCQUFzQixFQUFFLGNBQWM7Z0JBQ3RDLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1NBQ0Y7S0FDRjtJQUNELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxTQUFTO1lBQ2QsS0FBSyxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztZQUM5QixTQUFTLEVBQUUseUNBQWMsQ0FBQyxXQUFXO1lBQ3JDLEtBQUssRUFBRTtnQkFDTCxXQUFXLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO2dCQUNwQyxXQUFXLEVBQUUsQ0FBQyxvQ0FBUyxDQUFDLElBQUksQ0FBQzthQUM5QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUUsSUFBSTthQUNmO1lBQ0QsUUFBUSxFQUFFO2dCQUNSO29CQUNFLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxVQUFVO29CQUNoQixNQUFNLEVBQUUsOEhBQThIO2lCQUN2STthQUNGO1NBQ0Y7UUFDRDtZQUNFLEdBQUcsRUFBRSxRQUFRO1lBQ2IsS0FBSyxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztZQUM3QixTQUFTLEVBQUUseUNBQWMsQ0FBQyxXQUFXO1lBQ3JDLEtBQUssRUFBRTtnQkFDTCxXQUFXLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO2dCQUNuQyxXQUFXLEVBQUUsQ0FBQyxvQ0FBUyxDQUFDLElBQUksQ0FBQzthQUM5QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGO1FBQ0Q7WUFDRSxHQUFHLEVBQUUsT0FBTztZQUNaLEtBQUssRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUM7WUFDNUIsU0FBUyxFQUFFLHlDQUFjLENBQUMsV0FBVztZQUNyQyxLQUFLLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDbEMsV0FBVyxFQUFFLENBQUMsb0NBQVMsQ0FBQyxJQUFJLENBQUM7YUFDOUI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLEtBQUs7YUFDaEI7U0FDRjtRQUNEO1lBQ0UsR0FBRyxFQUFDLFFBQVE7WUFDWixLQUFLLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO1lBQzdCLFNBQVMsRUFBRSx5Q0FBYyxDQUFDLFdBQVc7WUFDckMsS0FBSyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUM7Z0JBQ25DLFdBQVcsRUFBRSxDQUFDLG9DQUFTLENBQUMsSUFBSSxDQUFDO2FBQzlCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxLQUFLO2FBQ2hCO1NBQ0Y7UUFDRDtZQUNFLEdBQUcsRUFBRSxNQUFNO1lBQ1gsS0FBSyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztZQUMzQixTQUFTLEVBQUUseUNBQWMsQ0FBQyxXQUFXO1lBQ3JDLEtBQUssRUFBRTtnQkFDTCxXQUFXLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO2dCQUNqQyxXQUFXLEVBQUUsQ0FBQyxvQ0FBUyxDQUFDLFFBQVEsQ0FBQzthQUNsQztZQUNELFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGO1FBQ0Q7WUFDRSxHQUFHLEVBQUUsY0FBYztZQUNuQixLQUFLLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QixDQUFDO1lBQ25DLFNBQVMsRUFBRSx5Q0FBYyxDQUFDLEtBQUs7WUFDL0IsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRTtvQkFDUCxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQztvQkFDNUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUM7b0JBQzVCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDO29CQUM1QixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQztvQkFDNUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUM7aUJBQzdCO2FBQ0Y7WUFDRCxRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLE1BQU0sRUFBRSw4SEFBOEg7aUJBQ3ZJO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLElBQUk7YUFDZjtTQUNGO1FBQ0Q7WUFDRSxHQUFHLEVBQUUsTUFBTTtZQUNYLEtBQUssRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDM0IsU0FBUyxFQUFFLHlDQUFjLENBQUMsS0FBSztZQUMvQixLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFO29CQUNQLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDO29CQUN6QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQztvQkFDMUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUM7b0JBQzFCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDO29CQUMxQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQztpQkFDM0I7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU07Z0JBQ3RCLFFBQVEsRUFBRSxDQUFDLEVBQUssUUFBUTtnQkFDeEIsUUFBUSxFQUFFLENBQUMsRUFBSyxRQUFRO2FBQ3pCO1NBQ0Y7S0FDRjtJQUNELGNBQWM7SUFDZCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsb0NBQVMsQ0FBQyxVQUFVO0tBQzNCO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLEVBQUU7UUFDekMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxHQUFHLGNBQWMsQ0FBQztRQUNsRixTQUFTLFdBQVcsQ0FBQyxLQUE0QztZQUMvRCxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQTtRQUN4QixZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXBCLE1BQU0sTUFBTSxHQUFHO1lBQ2IsT0FBTztZQUNQLElBQUk7WUFDSixLQUFLO1lBQ0wsTUFBTTtZQUNOLElBQUk7WUFDSixZQUFZO1lBQ1osSUFBSTtTQUNMLENBQUM7UUFFRixJQUFJLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUVBQW1FLEVBQUU7Z0JBQ25HLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRTtvQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2lCQUNuQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTztnQkFDTCxJQUFJLEVBQUUsb0NBQVMsQ0FBQyxPQUFPO2dCQUN2QixJQUFJLEVBQUU7b0JBQ0o7d0JBQ0UsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCO3dCQUNwQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUc7d0JBQ2xCLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNO3FCQUN4QztpQkFDRjthQUNGLENBQUM7UUFDSixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLG9DQUFTLENBQUMsS0FBSzthQUN0QixDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7Q0FDRixDQUFDLENBQUM7QUFDSCxrQkFBZSxrQ0FBTyxDQUFDIn0=