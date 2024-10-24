import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['replit.app', 'replit.dev']);

basekit.addField({
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
        'zoomPlaceholder': '请选择图片质量，质量越高生成时间越长',
        'help_document': '点击查看说明文档'
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
        "zoomPlaceholder": "Please select the image quality, higher quality takes longer to generate",
        'help_document': 'Click here to view the documentation'
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
        "zoomPlaceholder": "画像品質を選択してください。品質が高いほど生成時間が長くなります",
        'help_document': 'ドキュメントを表示するにはここをクリックしてください'
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
        maxLength: 256,
      },
      tooltips: [
        {
          type: 'link',
          text: t('help_document'),
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
      key: 'align_value',
      label: t('text_alignPlaceholder'),
      component: FieldComponent.Radio,
      props: {
        options: [
          { label: '左对齐', value: 'left'},
          { label: '右对齐', value: 'right'},
          { label: '居中', value: 'center'},
          { label: '两端对齐', value: 'justify'},
        ]
      },
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
    let { content, author, title, source, time, css_selector, zoom, align_value } = formItemParams;
    function extractText(items: { text: string }[] | undefined | null): string {
      return (items || []).map(item => item.text).join('');
    }
    let content_row_nums = content.length
    content = extractText(content);
    console.log(content_row_nums)
    if (content_row_nums > 24) {
      return {
        code: FieldCode.InvalidArgument,
        msg: `行数超过限制（不得超过 24 行），当前共 ${content_row_nums} 行`
      };
    }
    let name = extractText(author);
    title = extractText(title);
    source = extractText(source);
    time = Number(time)/1000
    css_selector = css_selector.value;
    zoom = zoom.value
    align_value = align_value.value

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
      const res = await context.fetch(`https://generate-share-card.replit.app/generate_card`, {
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
        msg: `试试调低下图片质量吧~`
      };
    }
  },
});
export default basekit;