---
name: ww-breadcrumb
description: A customizable breadcrumbs navigation component that displays hierarchical path information with various styling options
keywords: breadcrumbs, navigation, path, hierarchy, trail, links
---

#### Breadcrumbs

***Purpose:***
A customizable breadcrumbs navigation component that displays hierarchical path information with various styling options

***Properties:***
- `mode`: `'manual' | 'auto'` - Controls how breadcrumbs are generated. Default: `'manual'`
- `items`: `Array` - The array of breadcrumb items to display (used in manual mode). Default: `[{label: 'Home'}, {label: 'Products'}, {label: 'Category'}, {label: 'Current Page'}]`
- `labelPropertyPath`: `string` - The property path to use for item labels. Default: `'label'`
- `urlPropertyPath`: `string` - The property path to use for item URLs (hidden in auto mode). Default: `'link'`
- `iconPropertyPath`: `string` - The property path to use for item icons. Default: `'icon'`

***Display Properties:***
- `displayStyle`: `'standard' | 'pills' | 'arrows' | 'underline'` - The visual style of the breadcrumbs. Default: `'standard'`
- `separatorType`: `'slash' | 'arrow' | 'chevron' | 'dot' | 'pipe' | 'dash' | 'custom'` - The type of separator between items. Default: `'slash'`
- `customSeparator`: `string` - Custom separator text or HTML/SVG when separatorType is 'custom'. Default: `''`
- `collapse`: `boolean` - Whether to collapse the breadcrumbs. Default: `false`

***Styling - Colors Properties:***
- `linkColor`: `string` - The color of breadcrumb links. Default: `'#6B7280'`
- `activeColor`: `string` - The color of the active/current breadcrumb item. Default: `'#111827'`
- `separatorColor`: `string` - The color of the separators between breadcrumb items. Default: `'#9CA3AF'`
- `iconColor`: `string` - The color of icons in breadcrumb items. Default: `'#4B5563'`
- `activeIconColor`: `string` - The color of icons in the active/current breadcrumb item. Default: `'#111827'`
- `pillBackgroundColor`: `string` - The background color of pill-style breadcrumb items. Default: `'#f0f0f0'`
- `activePillBackgroundColor`: `string` - The background color of the active pill-style breadcrumb item. Default: `'#e0e0e0'`
- `arrowColor`: `string` - The color of the arrow shape in arrow-style breadcrumb items. Default: `'#FFFFFF'`

***Styling - Typography Properties:***
- `fontSize`: `string` - The font size for breadcrumb text. Default: `'14px'`
- `activeItemFontWeight`: `'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'` - The font weight for the active/current breadcrumb item. Default: `'600'`
- `hoverDecoration`: `'none' | 'underline' | 'overline' | 'line-through'` - The text decoration for breadcrumb links on hover. Default: `'none'`

***Styling - Layout Properties:***
- `itemSpacing`: `string` - The spacing between breadcrumb items. Default: `'8px'`
- `separatorSpacing`: `string` - The spacing around separators. Default: `'12px'`
- `separatorSize`: `string` - The font size of separators. Default: `'12px'`

***Slots:***
- `iconElement`: ww-icon - The icon element for each breadcrumb item. (Forced prop : color, icon)
- `linkElement`: ww-div - The wrapper element for each breadcrumb item.
- `textElement`: ww-text - The text element for each breadcrumb item. (Forced prop : text, link)

***Notes:***
- SPECIAL: Each of these children are unique, but in the UI it will reuse the same element for all breadcrumb items. The purpose of those is to add style to the element.
- Icon is on the left, text is on the right. You should add spacing between them.


***Example:***
<elements>
{"uid":0,"tag":"ww-breadcrumb","props":{"default":{"items":[{"label":"Home","icon":"phosphor-regular/house"},{"label":"Products"},{"label":"Category"}],"mode":"manual","labelPropertyPath":"label","urlPropertyPath":"link","iconPropertyPath":"icon","displayStyle":"arrows","separatorType":"slash","customSeparator":"","collapse":false,"linkColor":"#6B7280","activeColor":"#111827","separatorColor":"#9CA3AF","iconColor":"#4B5563","activeIconColor":"#111827","pillBackgroundColor":"#f0f0f0","activePillBackgroundColor":"#e0e0e0","arrowColor":"#E6E6E6","fontSize":"14px","activeItemFontWeight":"600","hoverDecoration":"none","itemSpacing":"8px","separatorSpacing":"12px","separatorSize":"14px"}},"styles":{"default":{"backgroundColor":"#F5F5F5"}},"children":{"linkElement":{"uid":1},"iconElement":{"uid":2},"textElement":{"uid":3}}}
{"uid":1,"tag":"ww-div"}
{"uid":2,"tag":"ww-icon","styles":{"default":{"margin":"0 4px"}}}
{"uid":3,"tag":"ww-text"}
</elements>
