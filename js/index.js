const loadContentSource = (element) => {
  return new Promise((resolve) => {
    let contentSource = $(element).attr('contentSource');
    console.log('load', contentSource);
    $.get(contentSource, function (data) {
      let subElementsShouleBeEmpty = [];

      if ('.md' == contentSource.substr(0 - '.md'.length)) {
        let content = $(marked(data))
        content.find('*').each(function (index, element) {

          let html = $(element).html().trim()
          if (html.substr(0, 'contentSource='.length) == 'contentSource=') {

            console.log(contentSource + ' 转成 html 后的 sub tag 中有', $(element).prop('outerHTML'))
            let attrValue = html.split('=')[1].replace(/'/g, "").replace(/"/g, "");
            $(element).attr('contentSource', attrValue)
            console.log('add attrValue', attrValue)

            console.log('emptyHtml', $(element).attr('contentSource'))
            $(element).html("")
            console.log($(element).prop('outerHTML'))
          }
        });

        $(element).html(content)
        resolve()
      } else {
        $(element).html(data)
        resolve()
      }
    });
  })
}

const replaceContentSource = () => {
  return Promise.all(
    $('[contentSource]').map(function (index, element) {
      if ($(element).html().trim().length === 0) {
        return new Promise((resolve) => {
          loadContentSource(element)
            .then(() => {
              resolve()
            })
        });
      }
    })
  );
}

const myOnload = () => {
  replaceContentSource()
    .then(() => {
      console.log('replaceContentSource 1')
      return replaceContentSource()
    })
    .then(() => {
      console.log('replaceContentSource 2')
      return replaceContentSource()
    })
    .then(() => {
      console.log('replaceContentSource 3')
      return replaceContentSource()
    })
    .then(() => {
      console.log('replaceContentSource 4')
      return replaceContentSource()
    })
}
