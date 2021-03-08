# ezz-vue-datatable
Datatable for vue js

# installation
`
npm i ezz-vue-datatable
`

# setup
```js
import DataTable from 'ezz-vue-datatable';
import Vue from 'vue';
	
Vue.use(DataTable);
```

# directive
<strong>data-table-online</strong>  (online/live data query)<br>
<strong>data-table-offline</strong>  (offline manual set of items)
	
	
# common props

<strong>name:</strong> action <br>
<strong>description</strong> : to show action menu (entries option, status bar, pagination)<br>
<strong>type:</strong> boolean <br>
<strong>default:</strong> true <br>

<strong>name:</strong> showEntriesOption <br>
<strong>description :</strong> to show number of entries option<br>
<strong>type:</strong> boolean <br>
<strong>default:</strong> true <br>

<strong>name:</strong> headers<br>
<strong>description :</strong> header of the table <br>
<strong>type:</strong> array<br>
<strong>required :</strong> true<br>
<strong>properties :</strong> [align (right, left, center), value (column), text (Header text), style, class]<br>

<strong>name:</strong> search<br>
<strong>description :</strong> enable/disable search bar<br>
<strong>type:</strong> boolean<br>
<strong>required:</strong> false<br>
<strong>default :</strong> true<br>

<strong>name:</strong> tableClass<br>
<strong>description :</strong>table class<br>
<strong>type:</strong> array<br>
<strong>required:</strong> false<br>
<strong>default:</strong> ['table', 'table-default', 'table-sm', 'table-bordered', 'table-hover', 'table-striped']<br>

<strong>name:</strong> searchString<br>
<strong>description :</strong> search string value<br>
<strong>type:</strong> String<br>
<strong>required:</strong> true<br>
<strong>default:</strong>  null<br>

<strong>name:</strong> pageStart<br>
<strong>description :</strong>  starting page<br>
<strong>type:</strong>  Number<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   1<br>

<strong>name:</strong>  itemsPerPage<br>
<strong>description :</strong>  Items per page to show<br>
<strong>type: </strong> Number<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>  10 <br>
<br>

<strong>name:</strong>  maxPageVisible<br>
<strong>description :</strong>  number of pages to show<br>
<strong>type:</strong>  Number<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   5<br>


<strong>name:</strong>  entriesOptions<br>
<strong>description :</strong>  option for items per page<br>
<strong>type:</strong>  array<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   [10,15,20,50,100, -1]<br>

<strong>name:</strong>  noResultsText<br>
<strong>description :</strong>  text for no result found<br>
<strong>type:</strong>  String<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   'No data found'<br>

<strong>name:</strong>  loadingText<br>
<strong>description :</strong>  loading text<br>
<strong>type:</strong>  String<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   'Loading data. Please wait...'<br>

<strong>name:</strong>  nextText<br>
<strong>description :</strong>  pagination next button text<br>
<strong>type:</strong>  String<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   '»'<br>

<strong>name:</strong>  prevText<br>
<strong>description :</strong>  pagination previous button text<br>
<strong>type:</strong>  string<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   '«'<br>

<strong>name:</strong>  lastText<br>
<strong>description :</strong>  pagination Last page button text<br>
<strong>type:</strong>  String<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   '&rarr;'<br>

<strong>name:</strong>  firstText<br>
<strong>description :</strong>  pagination First page button text<br>
<strong>type:</strong>  String<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   '&larr;'<br>

<strong>name: </strong> showSelect<br>
<strong>description :</strong>  select option (both header and table items)<br>
<strong>type:</strong>  boolean<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   false<br>

<strong>name:</strong>  singleSelect<br>
<strong>description :</strong>  show select option (table rows only)<br>
<strong>type:</strong>  Boolean<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>   false<br>

<strong>name:</strong>  showLoading<br>
<strong>description :</strong>  show loading animation<br>
<strong>type:</strong>  Boolean<br>
<strong>required:</strong>  false<br>
<strong>default:</strong>  true
<br>

# online props<br>
<strong>name:</strong>  url<br>
<strong>description :</strong>  url where to get the data<br>
<strong>type:</strong>  string<br>
<strong>required :</strong>  true<br>

<strong>name:</strong>  requestWith<br>
<strong>description :</strong>  additional http request data to server<br>
<strong>type:</strong>  Object<br>
<strong>required:</strong>  false<br>
<strong>default: </strong>  {}
<br>


# common slots<br>
top - top slots<br>
entries-before - before entry options<br>
entries-after -after entry options<br>
search-before - before search bar<br>
search-after - after search bar<br>
header - to overide header<br>
items - to overide items<br>
bottom - bottom slots<br>
pagination-before - before pagination slot<br>
pagination - pagination slot<br>
pagination-after - after pagination slot<br>
status-bar - status bar slot<br>


# online slot scopes
<strong>item</strong> (items slot only) - get item on items slot<br>
<strong>items</strong>  (all slot) - get all items<br>
<strong>headers</strong>  (all slot) - get header data<br>
<strong>selected</strong>  (all slot) - get selected data<br>
<strong>allSelected</strong>  (all slot) - check if all items are selected<br>
<strong>range</strong>  (all slot) - pagination range<br>
<strong>sort</strong>  (all slot) - method to sort items<br>
<strong>refresh</strong>  (all slot) - method to refresh data<br>
<strong>select</strong>  (all slot) - method to select item<br>
<strong>data</strong> (all slot) - get component data<br>
<strong>instance</strong> (all slot) - get component instance<br>
<strong>from</strong>  (all slot)  - status from data<br>
<strong>to</strong> (all slot)  - status to data<br>
<strong>totalResults</strong> (all slot) - status total Results<br>
<strong>setPage</strong> (all slot)  - method to set  page<br>
<strong>totalPages</strong> (all slot) - get total pages<br>
<strong>page</strong> (all slot) - get current page<br>

# offline slot scopes
<strong>item</strong> (items slot only) - get item on items slot<br>
<strong>items</strong>  (all slot) - get all items<br>
<strong>headers</strong>  (all slot) - get header data<br>
<strong>selected</strong>  (all slot) - get selected data<br>
<strong>allSelected</strong>  (all slot) - check if all items are selected<br>
<strong>range</strong>  (all slot) - pagination range<br>
<strong>sort</strong>  (all slot) - method to sort items<br>
<strong>select</strong>  (all slot) - method to select item<br>
<strong>data</strong> (all slot) - get component data<br>
<strong>instance</strong> (all slot) - get component instance<br>
<strong>from</strong>  (all slot)  - status from data<br>
<strong>to</strong> (all slot)  - status to data<br>
<strong>totalResults</strong> (all slot) - status total Results<br>
<strong>setPage</strong> (all slot)  - method to set  page<br>
<strong>totalPages</strong> (all slot) - get total pages<br>
<strong>outputItems</strong> (all slot) - get current page items<br>
<strong>entriesOptions</strong> (all slot) - get entries option (array)<br>
<strong>setPage</strong> (all slot) - set current page<br>
<strong>page</strong> (all slot) - get current page<br>



# (online) server requests
field : page <br>
description: page for pagination<br>
type: Int<br>
default: 1<br>
required: true<br>

field: result_per_page<br>
description: Result Per Page<br>
type: Int<br>
default: 10<br>
required: true<br>

field: search<br>
description: Search value 
type: String<br>
default: null<br>
required: true<br>

field: orderBy<br>
description: Order By (db table column)<br>
type: String<br>
default: null<br>

# (online) datatable expected server response
type: json<br>
<strong>properties:</strong><br>
	type: success/error<br>
	total_pages: Integer<br>
	total_results: Integer<br>
	data: result data (array)<br>

 
