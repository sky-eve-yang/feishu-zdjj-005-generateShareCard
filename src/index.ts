import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['replit.app', 'replit.dev']);

basekit.addField({
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
        "content": "Content",
        "author": "Author",
        "title": "Title",
        "source": "Source",
        "time": "Time",
        "zoom": "Image Quality",
        "contentPlaceholder": "Please select the content field",
        "authorPlaceholder": "Please select the author field",
        "titlePlaceholder": "Please select the title field",
        "sourcePlaceholder": "Please select the source field",
        "timePlaceholder": "Please select the time field",
        "css_selectorPlaceholder": "Please select the card theme",
        "zoomPlaceholder": "Please select the image quality, higher quality takes longer to generate"
      },
      'ja-JP': {
        "content": "内容",
        "author": "作者",
        "title": "タイトル",
        "source": "ソース",
        "time": "時間",
        "zoom": "画像品質",
        "contentPlaceholder": "内容フィールドを選択してください",
        "authorPlaceholder": "作者フィールドを選択してください",
        "titlePlaceholder": "タイトルフィールドを選択してください",
        "sourcePlaceholder": "ソースフィールドを選択してください",
        "timePlaceholder": "時間フィールドを選択してください",
        "css_selectorPlaceholder": "カードテーマを選択してください",
        "zoomPlaceholder": "画像品質を選択してください。品質が高いほど生成時間が長くなります"
      },
    }
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'content',
      label: t('contentPlaceholder'),
      component: FieldComponent.FieldSelect,
      props: {
        placeholder: t('contentPlaceholder'),
        supportType: [FieldType.Text],
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
      component: FieldComponent.FieldSelect,
      props: {
        placeholder: t('authorPlaceholder'),
        supportType: [FieldType.Text],
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'title',
      label: t('titlePlaceholder'),
      component: FieldComponent.FieldSelect,
      props: {
        placeholder: t('titlePlaceholder'),
        supportType: [FieldType.Text],
      },
      validator: {
        required: false,
      }
    },
    {
      key:'source',
      label: t('sourcePlaceholder'),
      component: FieldComponent.FieldSelect,
      props: {
        placeholder: t('sourcePlaceholder'),
        supportType: [FieldType.Text],
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'time',
      label: t('timePlaceholder'),
      component: FieldComponent.FieldSelect,
      props: {
        placeholder: t('timePlaceholder'),
        supportType: [FieldType.DateTime],
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'css_selector',
      label: t('css_selectorPlaceholder'),
      component: FieldComponent.Radio,
      props: {
        options: [
          { label: '梦幻晨曦', value: '1'},
          { label: '墨染夜空', value: '2'},
          { label: '炫彩日落', value: '3'},
          { label: '海天幻境', value: '4'},
          { label: '朦胧灰雾', value: '5'},
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
      component: FieldComponent.Radio,
      props: {
        options: [
          { label: '低', value: '1'},
          { label: '较低', value: '2'},
          { label: '一般', value: '3'},
          { label: '较高', value: '4'},
          { label: '最高', value: '5'},
        ]
      },
      validator: {
        required: true, // 必填项
        minItems: 1,    // 最小值为1
        maxItems: 5,    // 最大值为5
      }
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Attachment
  },
  execute: async (formItemParams, context) => {
    let { content, author, title, source, time, css_selector, zoom } = formItemParams;
    function extractText(items: { text: string }[] | undefined | null): string {
      return (items || []).map(item => item.text).join('');
    }
    
    content = extractText(content);
    let name = extractText(author);
    title = extractText(title);
    source = extractText(source);
    time = Number(time)/1000
    css_selector = css_selector.value;
    zoom = zoom.value
    console.log(content)

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
        code: FieldCode.Success,
        data: [
          {
            "name": res.name, // 附件名称,需要带有文件格式后缀
            "content": res.src,
            "contentType": "attachment/url", // 固定值
          }
        ]
      };
    } catch (e) {
      return {
        code: FieldCode.Error,
      };
    }
  },
});
export default basekit;