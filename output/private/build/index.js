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
                'contentPlaceholder': '请选择内容字段',
                'authorPlaceholder': '请选择作者字段',
                'titlePlaceholder': '请选择标题字段',
                'sourcePlaceholder': '请选择来源字段',
                'timePlaceholder': '请选择时间字段',
                'css_selectorPlaceholder': '请选择卡片主题',
                'text_alignPlaceholder': '请选择文本对齐方式',
                "content_max_length": "内容字数超过限制（不得超过256字）",
                'zoomPlaceholder': '请选择图片质量，质量越高生成时间越长'
            },
            'en-US': {
                "contentPlaceholder": "Please select the content field",
                "authorPlaceholder": "Please select the author field",
                "titlePlaceholder": "Please select the title field",
                "sourcePlaceholder": "Please select the source field",
                "timePlaceholder": "Please select the time field",
                "css_selectorPlaceholder": "Please select the card theme",
                'text_alignPlaceholder': 'Please select the text alignment',
                "content_max_length": "The content word count exceeds the limit (no more than 256 words allowed).",
                "zoomPlaceholder": "Please select the image quality, higher quality takes longer to generate"
            },
            'ja-JP': {
                "contentPlaceholder": "内容フィールドを選択してください",
                "authorPlaceholder": "作者フィールドを選択してください",
                "titlePlaceholder": "タイトルフィールドを選択してください",
                "sourcePlaceholder": "ソースフィールドを選択してください",
                "timePlaceholder": "時間フィールドを選択してください",
                "css_selectorPlaceholder": "カードテーマを選択してください",
                'text_alignPlaceholder': 'テキストの整列方式を選択してください。',
                "content_max_length": "内容の文字数が制限を超えています（256字以内でお願いします）。",
                "zoomPlaceholder": "画像品質を選択してください。品質が高いほど生成時間が長くなります"
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
                maxLength: 256,
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
            key: 'align_value',
            label: t('text_alignPlaceholder'),
            component: block_basekit_server_api_1.FieldComponent.Radio,
            props: {
                options: [
                    { label: '左对齐', value: 'left' },
                    { label: '右对齐', value: 'right' },
                    { label: '居中', value: 'center' },
                    { label: '两端对齐', value: 'justify' },
                ]
            },
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
        let { content, author, title, source, time, css_selector, zoom, align_value } = formItemParams;
        function extractText(items) {
            return (items || []).map(item => item.text).join('');
        }
        let content_row_nums = content.length;
        content = extractText(content);
        console.log(content_row_nums);
        if (content_row_nums > 24) {
            return {
                code: block_basekit_server_api_1.FieldCode.InvalidArgument,
                msg: `行数超过限制（不得超过 24 行），当前共 ${content_row_nums} 行`
            };
        }
        let name = extractText(author);
        title = extractText(title);
        source = extractText(source);
        time = Number(time) / 1000;
        css_selector = css_selector.value;
        zoom = zoom.value;
        align_value = align_value.value;
        const params = {
            content,
            name,
            title,
            source,
            time,
            css_selector,
            zoom,
            align_value
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
                msg: `试试调低下图片质量吧~`
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFFcEQsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLG9CQUFvQixFQUFFLFNBQVM7Z0JBQy9CLG1CQUFtQixFQUFFLFNBQVM7Z0JBQzlCLGtCQUFrQixFQUFFLFNBQVM7Z0JBQzdCLG1CQUFtQixFQUFFLFNBQVM7Z0JBQzlCLGlCQUFpQixFQUFFLFNBQVM7Z0JBQzVCLHlCQUF5QixFQUFFLFNBQVM7Z0JBQ3BDLHVCQUF1QixFQUFFLFdBQVc7Z0JBQ3BDLG9CQUFvQixFQUFFLG9CQUFvQjtnQkFDMUMsaUJBQWlCLEVBQUUsb0JBQW9CO2FBQ3hDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLG9CQUFvQixFQUFFLGlDQUFpQztnQkFDdkQsbUJBQW1CLEVBQUUsZ0NBQWdDO2dCQUNyRCxrQkFBa0IsRUFBRSwrQkFBK0I7Z0JBQ25ELG1CQUFtQixFQUFFLGdDQUFnQztnQkFDckQsaUJBQWlCLEVBQUUsOEJBQThCO2dCQUNqRCx5QkFBeUIsRUFBRSw4QkFBOEI7Z0JBQ3pELHVCQUF1QixFQUFFLGtDQUFrQztnQkFDM0Qsb0JBQW9CLEVBQUUsNEVBQTRFO2dCQUNsRyxpQkFBaUIsRUFBRSwwRUFBMEU7YUFDOUY7WUFDRCxPQUFPLEVBQUU7Z0JBQ1Asb0JBQW9CLEVBQUUsa0JBQWtCO2dCQUN4QyxtQkFBbUIsRUFBRSxrQkFBa0I7Z0JBQ3ZDLGtCQUFrQixFQUFFLG9CQUFvQjtnQkFDeEMs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