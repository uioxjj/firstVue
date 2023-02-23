export function waterFall(
    wrapIdName,
    contentIdName,
    columns = 4,
    columnGap = 50,
    rowGap = 50
  ) {
    // 获得内容可用宽度（去除滚动条宽度）
    const wrapContentWidth =
      document.querySelector(wrapIdName).offsetWidth - 8;

    // 间隔空白区域
    const whiteArea = (columns - 1) * columnGap;

    // 得到每列宽度(也即每项内容宽度)
    const contentWidth = parseInt((wrapContentWidth - whiteArea) / columns);

    // 得到内容项集合
    const contentList = document.querySelectorAll(contentIdName);

    // 成行内容项高度集合
    const lineConentHeightList = [];

    for (let i = 0; i < contentList.length; i++) {
      // 动态设置内容项宽度
      contentList[i].style.width = contentWidth + "px";

      // 获取内容项高度
      const height = contentList[i].clientHeight;

      if (i < columns) {
        // 第一行按序布局
        contentList[i].style.top = 0;
        contentList[i].style.left = contentWidth * i + columnGap * i + "px";

        // 将行高push到数组
        lineConentHeightList.push(height);
      } else {
        // 其他行
        // 获取数组最小的高度 和 对应索引
        let minHeight = Math.min(...lineConentHeightList);
        let index = lineConentHeightList.findIndex(
          (listH) => listH === minHeight
        );

        contentList[i].style.top = minHeight + rowGap + "px";
        contentList[i].style.left = (contentWidth + columnGap) * index + "px";

        // 修改最小列的高度 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 行间距
        lineConentHeightList[index] += height + rowGap;
        }
      }
    }