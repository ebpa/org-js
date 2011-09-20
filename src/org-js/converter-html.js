var Node = require("./node.js").Node;

var HtmlTextConverter = {
  convertNode: function (node) {
    var childText = node.children ? this.convertNodes(node.children) : "";
    var text;

    switch (node.type) {
    case Node.types.text:
      text = node.value;
      break;
    case Node.types.header:
      text = "<h" + node.level  + ">" + childText + "</h" + node.level  + ">\n";
      break;
    case Node.types.orderedList:
      text = "<ol>\n" + childText + "</ol>\n";
      break;
    case Node.types.unorderedList:
      text = "<ul>\n" + childText + "</ul>\n";
      break;
    case Node.types.listElement:
      text = "<li>" + childText + "</li>\n";
      break;
    case Node.types.paragraph:
      text = "<p>" + childText + "</p>\n";
      break;
    case Node.types.preformatted:
      text = "<pre>" + childText + "</pre>\n";
      break;
    case Node.types.table:
      // TODO: Consider <col> or <colgroup>
      text = "<table>\n<tbody>\n" + childText + "</tbody>\n</table>\n";
      break;
    case Node.types.tableRow:
      text = "<tr>" + childText + "</tr>\n";
      break;
    case Node.types.tableCell:
      if (node.isHeader)
        text = "<th>" + childText + "</th>\n";
      else
        text = "<td>" + childText + "</td>";
      break;
      // ============================================================ //
      // Inline
      // ============================================================ //
    case Node.types.inlineContainer:
      text = childText;
      break;
    case Node.types.bold:
      text = "<b>" + childText + "</b>";
      break;
    case Node.types.italic:
      text = "<i>" + childText + "</i>";
      break;
    case Node.types.underline:
      text = "<span style='text-decoration:underline;'>" + childText + "</span>";
      break;
    case Node.types.code:
      text = "<code>" + childText + "</code>";
      break;
    case Node.types.dashed:
      text = "<del>" + childText + "</del>";
      break;
    case Node.types.link:
      if (this.imageExtensionPattern.exec(node.src))
        text = "<img src=\"" + node.src + "\" alt=\"" + childText + "\"/>"; // TODO: escape childText
      else
        text = "<a href=\"" + node.src + "\">" + childText + "</a>";
      break;
    }

    return text;
  },

  convertNodes: function (nodes) {
    return nodes.map(this.convertNode.bind(this)).join("");
  },

  imageExtensionPattern: new RegExp("(" + [
    "bmp", "png", "jpeg", "jpg", "gif", "tiff",
    "tif", "xbm", "xpm", "pbm", "pgm", "ppm"
  ].join("|") + ")$")
};

if (typeof exports !== "undefined")
  exports.HtmlConverter = HtmlTextConverter;