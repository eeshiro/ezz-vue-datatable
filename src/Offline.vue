<template>
	<div class="container">
		<div class="row">
			<slot name="top" 
				:items="items" 
				:headers="headers" 
				:selected="selected" 
				:allSelected="allSelected" 
				:range="range"
				:sort="sort"
				:select="select"
				:from="from"
				:to="to"
				:totalResults="totalResults"
				:totalPages="totalPages"
				:outputItems="outputItems"
				:entriesOptions="entriesOptions"
				:page="page"
				:setPage="setPage"
				:setIpp="setIpp"
				:instance="instance"
				:data="$data">
			</slot>

			<div class="col p-0 align-self-first m-0 mb-2">
		  		<div class="row p-0 text-secondary pl-3">
		  			<slot name="entries-before" 
						:items="items" 
						:headers="headers" 
						:selected="selected" 
						:allSelected="allSelected" 
						:range="range"
						:sort="sort"
						:select="select"
						:from="from"
						:to="to"
						:totalResults="totalResults"
						:totalPages="totalPages"
						:outputItems="outputItems"
						:entriesOptions="entriesOptions"
						:page="page"
						:setPage="setPage"
						:setIpp="setIpp"
						:instance="instance"
						:data="$data"/>


					<slot name="entries" 
						:items="items" 
						:headers="headers" 
						:selected="selected" 
						:allSelected="allSelected" 
						:range="range"
						:sort="sort"
						:select="select"
						:from="from"
						:to="to"
						:totalResults="totalResults"
						:totalPages="totalPages"
						:outputItems="outputItems"
						:entriesOptions="entriesOptions"
						:page="page"
						:setPage="setPage"
						:setIpp="setIpp"
						:instance="instance"
						:data="$data">

						<div class="input-group input-group-sm p-0 mr-1" style="width: 180px !important"  v-if="action && showEntriesOption">
							<div class="input-group-prepend">
							    <small class="input-group-text border-0">Show</small>
							</div>
							<select v-model="ipp" class="form-control form-control-sm text-right p-0">
								<option v-for="(o, index) in entriesOptions" :value="o" :key="index">{{o !== -1 ? o : 'All' }}</option>
						 	</select>
							<div class="input-group-prepend ">
							    <small class="input-group-text border-0">entries</small>
							</div>			
						</div>
					</slot>

		  			
					<slot name="entries-after" 
						:items="items" 
						:headers="headers" 
						:selected="selected" 
						:allSelected="allSelected" 
						:range="range"
						:sort="sort"
						:select="select"
						:from="from"
						:to="to"
						:totalResults="totalResults"
						:totalPages="totalPages"
						:outputItems="outputItems"
						:entriesOptions="entriesOptions"
						:page="page"
						:setPage="setPage"
						:setIpp="setIpp"
						:instance="instance"
						:data="$data"/>	
				</div>
		  	</div>
		
			<div class="col p-0 align-self-end mb-2" v-if="search">
				<div class="row">	
					<div class="col justify-content-end">
						<div class="float-right" style="display: inline-block;">
							<div class="input-group">
								<div class="mr-1">
								  	<slot name="search-before" 
										:items="items" 
										:headers="headers" 
										:selected="selected" 
										:allSelected="allSelected" 
										:range="range"
										:sort="sort"
										:select="select"
										:from="from"
										:to="to"
										:totalResults="totalResults"
										:totalPages="totalPages"
										:outputItems="outputItems"
										:entriesOptions="entriesOptions"
										:page="page"
										:setPage="setPage"
										:setIpp="setIpp"
										:instance="instance"
										:data="$data"/>
							  	</div>
							  	<label class="m-1 text-bold"><small  >Search:  </small></label>
							  	<input type="text" placeholder="Enter text here..." class="form-control form-control-sm  rounded-0 m-0 " v-model= "searchValue" style="max-width: 200px!important;">
							  	<div class="">
								  	<slot name="search-after" 
										:items="items" 
										:headers="headers" 
										:selected="selected" 
										:allSelected="allSelected" 
										:range="range"
										:sort="sort"
										:select="select"
										:from="from"
										:to="to"
										:totalResults="totalResults"
										:totalPages="totalPages"
										:outputItems="outputItems"
										:entriesOptions="entriesOptions"
										:page="page"
										:setPage="setPage"
										:setIpp="setIpp"
										:instance="instance"
										:data="$data"/>
							  	</div>
							</div>	
						</div>
						
					</div>
				</div>
			</div>

      <div class="progress-container">
        <transition name="fade" v-if="showLoading">
          <div class="progress" v-show="busy">
            <div class="indeterminate"></div>
          </div>
        </transition>
      </div>
			<table :class="tableClass" :style="tableStyle">
				<thead>
					<tr>
						<slot name="header"
							:items="items" 
							:headers="headers" 
							:selected="selected" 
							:allSelected="allSelected" 
							:range="range"
							:sort="sort"
							:select="select"
							:from="from"
							:to="to"
							:totalResults="totalResults"
							:totalPages="totalPages"
							:outputItems="outputItems"
							:entriesOptions="entriesOptions"
							:page="page"
							:setPage="setPage"
							:setIpp="setIpp"
							:instance="instance"
							:data="$data">
							<th align="center" v-if="showSelect || singleSelect">
								<span class="" v-if="showSelect">
									<input type="checkbox" style="zoom: 1.5" v-model="allSelected">
								</span>
							</th>

							<th v-for="(header,index) in headers"
								@click="header.sortable == true ? sort(header.value): ''" 
								:style="header.style || {'font-weight': 'lighter'}"
								:class="[ `text-${header.align}`, header.class, header.sortable ? 'cursor-pointer' : '']"
                :key="index">

								{{header.text}}
								<i v-if="header.sortable" :class="['fa', sortBy == header.value ? (inverse === true ? 'fa-arrow-down' : 'fa-arrow-up') : '']"></i>
							</th>
								
						</slot>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in outputItems" @click="showSelect  ? item.selected = !item.selected : (singleSelect ? select(item) : '')" :key="item._key">
						<slot name="items"  
							:item="item" 
							:items="items" 
							:headers="headers" 
							:selected="selected" 
							:allSelected="allSelected" 
							:range="range"
							:sort="sort"
							:select="select"
							:from="from"
							:to="to"
							:totalResults="totalResults"
							:totalPages="totalPages"
							:outputItems="outputItems"
							:entriesOptions="entriesOptions"
							:page="page"
							:setPage="setPage"
							:setIpp="setIpp"
							:instance="instance"
							:data="$data">
							<td align="center" v-if="showSelect || singleSelect">
								<input type="checkbox" style="zoom: 1.5" v-model="item.selected">
							</td>
							<td v-for="(header, i) in headers" :align="header.align" :key="i">{{item[header.value]}}</td>
						</slot>
					</tr>
					<tr v-if="outputItems.length == 0">
						<td colspan="100%" class="text-center p-3"> {{ busy ? loadingText :  noResultsText}}</td>
					</tr>
				</tbody>
			</table>

			<div class="border container mt-0 border-top-0">
				<div class="row p-2">

					<div v-if="action" class="col p-0 align-self-first" >
						<slot name="status-bar-before"
							:items="items" 
							:headers="headers" 
							:selected="selected" 
							:allSelected="allSelected" 
							:range="range"
							:sort="sort"
							:select="select"
							:from="from"
							:to="to"
							:totalResults="totalResults"
							:totalPages="totalPages"
							:outputItems="outputItems"
							:entriesOptions="entriesOptions"
							:page="page"
							:setPage="setPage"
							:setIpp="setIpp"
							:instance="instance"
							:data="$data"/>

						<div v-show="outputItems.length > 0" >
							<slot name="status-bar"
								:items="items" 
								:headers="headers" 
								:selected="selected" 
								:allSelected="allSelected" 
								:range="range"
								:sort="sort"
								:select="select"
								:from="from"
								:to="to"
								:totalResults="totalResults"
								:totalPages="totalPages"
								:outputItems="outputItems"
								:entriesOptions="entriesOptions"
								:page="page"
								:setPage="setPage"
								:setIpp="setIpp"
								:instance="instance"
								:data="$data">
								<div class="form-group p-0 m-0" v-if="showStatusBar">
								    <span class="font-13 text-secondary">Showing {{from}} to {{to}} of {{totalResults}} entries </span>
								</div>
							</slot>
						</div>
						<slot name="status-bar-after"
							:items="items" 
							:headers="headers" 
							:selected="selected" 
							:allSelected="allSelected" 
							:range="range"
							:sort="sort"
							:select="select"
							:from="from"
							:to="to"
							:totalResults="totalResults"
							:totalPages="totalPages"
							:outputItems="outputItems"
							:entriesOptions="entriesOptions"
							:page="page"
							:setPage="setPage"
							:setIpp="setIpp"
							:instance="instance"
							:data="$data"/>
						
					</div>
					<div v-if="action" v-show="outputItems.length > 0" class="col p-0 align-self-end">
						<div class="row ">
							<div class="col m-0 ">
								<div class="float-right">

									<slot name="pagination-before"
										:items="items" 
										:headers="headers" 
										:selected="selected" 
										:allSelected="allSelected" 
										:range="range"
										:sort="sort"
										:select="select"
										:from="from"
										:to="to"
										:totalResults="totalResults"
										:totalPages="totalPages"
										:outputItems="outputItems"
										:entriesOptions="entriesOptions"
										:page="page"
										:setPage="setPage"
										:setIpp="setIpp"
										:instance="instance"
										:data="$data"/>

									<slot name="pagination"
										:items="items" 
										:headers="headers" 
										:selected="selected" 
										:allSelected="allSelected" 
										:range="range"
										:sort="sort"
										:select="select"
										:from="from"
										:to="to"
										:totalResults="totalResults"
										:totalPages="totalPages"
										:outputItems="outputItems"
										:entriesOptions="entriesOptions"
										:page="page"
										:setPage="setPage"
										:setIpp="setIpp"
										:instance="instance"
										:data="$data">

										<ul v-if="showPagination" class="pagination pagination-sm" style="padding : 0 !important; margin: 0 !important;">

										  	<li :class="['page-item', 'cursor-pointer', page == 1 ? 'disabled' : '']" @click=" page > 1 ? page = 1 : ''">
										      <a class="page-link" href="javascript:void(0)" aria-label="First">
										        <span aria-hidden="true" v-html="firstText"></span>
										        <span class="sr-only">First</span>
										      </a>
										    </li>
										    <li :class="['page-item', 'cursor-pointer', page == 1 ? 'disabled' : '']"  @click="  page > 1 ? page-- : ''">
										      <a class="page-link" href="javascript:void(0)" aria-label="Previous">
										        <span aria-hidden="true" v-html="prevText"></span>
										        <span class="sr-only">Previous</span>
										      </a>
										    </li>
										    <li v-for="(r, i) in range" :key="i" :class="['page-item', 'cursor-pointer', r == page ? 'active' : '' ]"  @click=" r != page ? page = r : ''">
										    	<a class="page-link" href="javascript:void(0)">{{r}}</a></li>
										    <li :class="['page-item', 'cursor-pointer', page == totalPages ? 'disabled' : '']" @click="page < totalPages ? page++ : ''">
										      <a class="page-link" href="javascript:void(0)" aria-label="Next">
										        <span aria-hidden="true" v-html="nextText"></span>
										        <span class="sr-only">Next</span>
										      </a>
										    </li>
										    <li :class="['page-item', 'cursor-pointer', page == totalPages ? 'disabled' : '']"  @click=" page < totalPages ? page = totalPages : ''">
										      <a class="page-link" href="javascript:void(0)" aria-label="Next">
										        <span aria-hidden="true" v-html="lastText"></span>
										        <span class="sr-only">Last</span>
										      </a>
										    </li>
										</ul>
									</slot>
									<slot name="pagination-after"
										:items="items" 
										:headers="headers" 
										:selected="selected" 
										:allSelected="allSelected" 
										:range="range"
										:sort="sort"
										:select="select"
										:from="from"
										:to="to"
										:totalResults="totalResults"
										:totalPages="totalPages"
										:outputItems="outputItems"
										:entriesOptions="entriesOptions"
										:page="page"
										:setPage="setPage"
										:setIpp="setIpp"
										:instance="instance"
										:data="$data"/>
								</div>
							</div>
						</div>
					</div>
					<slot name="bottom" 
						:items="items" 
						:headers="headers" 
						:selected="selected" 
						:allSelected="allSelected" 
						:range="range"
						:sort="sort"
						:select="select"
						:from="from"
						:to="to"
						:totalResults="totalResults"
						:totalPages="totalPages"
						:outputItems="outputItems"
						:entriesOptions="entriesOptions"
						:page="page"
						:setPage="setPage"
						:setIpp="setIpp"
						:instance="instance"
						:data="$data"
						>
					</slot>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	export default {
		props : {
			action : {
				type : Boolean,
				default : true
			},
			showEntriesOption : {
				type : Boolean,
				default : true
			},
			showPagination : {
				type : Boolean,
				default : true
			},
			showStatusBar : {
				type : Boolean,
				default : true
			},
			headers: {
				type : Array,
				required : true
			},
			items :{
				type : Array,
				required : true
			},
			search : {
				type : Boolean,
				default : true,
			},
			tableClass : {
				type : [String, Array, Object],
				default : () => ['table', 'table-default', 'table-sm', 'table-bordered', 'table-hover', 'table-striped']
			},
			tableStyle : {
				type : [String, Array, Object],
				default : () => `margin-bottom: 0px;`
			},
			searchString: {
				type :  String,
				default : '',
			},
			pageStart : {
				type : Number,
				default : 1,
			},
			itemsPerPage : {
				type : Number,
				default : 10
			},
			maxPageVisible : {
				type : Number,
				default : 5
			},
			entriesOptions : {
				type : Array,
				default : ()=> ([10,15,20,50,100, -1])
			},
			noResultsText : {
				type : String,
				default : 'No data found.'
			},
			loadingText : {
				type : String,
				default : 'Loading data... Please wait..'
			},
			nextText : {
				type : String,
				default : '»'
			},
			prevText : {
				type : String,
				default : '«'
			},
			lastText : {
				type : String,
				default : '&rarr;'
			},
			firstText : {
				type : String,
				default : '&larr;'
			},
			showSelect :{
				type : Boolean,
				default : false
			},
			singleSelect: {
				type : Boolean,
				default : false
			},
			showLoading:{
				type : Boolean,
				default : true
			},
			isBusy: {
				type : Boolean,
				default : false
			}
		},

		data : ()=>({
			sortBy : '',
			inverse : false,
			timeOut : null,
			searchValue : '',
			page : 1,
			ipp : null,
			busy : true,
		}),
		methods : {
			sort(value){
				if(value != this.sortBy)
					this.inverse = true;
				else{
					this.inverse = !this.inverse;
				}
				this.sortBy = value;
			},
			addItemKey(){
				this.items.forEach((row, i)=>{
					this.$set(this.items[i], '_key', i);
				})
			},
			addSelectionOption(){
				this.items.forEach((row, i)=>{
					this.$set(this.items[i], 'selected', false);
				})
			},
			select(current){
				this.items.forEach((row, index)=>{
					/*if(index == i){
						row.selected = !row.selected;
						return;
					}*/
					
					row.selected = false;
				})

				current.selected = true;
			},
			setPage(page){
				this.page = parseInt(page);
			},
			setIpp(val){
				this.ipp = parseInt(val);
			},
			toggleBusy(){

				if(this.isBusy) return;

				if(!this.busy){
					this.busy = true;
				}

				clearTimeout(this.timeOut);
				this.timeOut = setTimeout(() => {
					this.busy = false;
				}, 300);
			}
		},
		watch :{
			searchString(value){
				this.searchValue = value;
			},
			itemsPerPage(val){
				this.ipp = val;
			},
			pageStart(val){
				this.page = val;
			},
			searchValue(){
				this.page = 1;
				this.toggleBusy();
			},
			ipp(){
				this.page = 1;
				this.toggleBusy();
			},
			items(){
				if(this.showSelect || this.singleSelect){
					this.addSelectionOption();
				}

				this.addItemKey();
				this.page = 1;

				this.toggleBusy();
			},
			page(){
				this.toggleBusy();
			},
			isBusy(val){
				clearTimeout(this.timeOut);
				this.timeOut = setTimeout(() => {
					this.busy = val;
				}, 300);
			}
		},
		computed : {
			totalPages(){
				var ipp = this.ipp != -1 ? this.ipp :  this.sortedItems.length;
				var total = Math.ceil(this.sortedItems.length / ipp);
				return total;
			},
			range(){
				var page = (this.page -1);
				var from = Math.floor( page / this.maxPageVisible ) * this.maxPageVisible;

		        var to  =  (from + this.maxPageVisible) < this.totalPages ? (from + this.maxPageVisible) : this.totalPages;

		        var range = [];
		        for(var c = from; c < to; c ++){
		            range.push(c + 1);
		        }
		        return range;
			},
			from(){
				var ipp = this.ipp !== -1 ? this.ipp : this.sortedItems.length;
				return (this.page - 1) * ipp + 1;
			},
			to(){
				return this.from + this.outputItems.length -1;
			},
			instance(){
				return this;
			},
			allSelected : {
				set(val){

					this.items.forEach((row, index)=>{				
						row.selected = val;
					})
				},
				get(){
					if(this.items.length == 0)
						return false;

					var selected = this.items.filter((item)=>{
						return item.selected;
					})

					return selected.length === this.items.length;
				}
			},
			selected(){
				return this.items.filter((item)=>{
					return item.selected;
				})
			},
			sortedItems(){

			 	var list = this.searchedItems;
			 	var field = this.sortBy;

		        if(list && field.length > 0 ){

		            list.sort((a,b)=>{
		                var val1  = isNaN(a[field]) ? a[field] : Number(a[field]);
		                var val2  = isNaN(b[field]) ? b[field] : Number(b[field]);

		                if (val1  < val2 ){
		                  return !this.inverse ? -1 : 1;
		                }
		                if (val1  > val2 ){
		                  return !this.inverse  ? 1 : -1;
		                }
		                return 0;
		            });
		        }

		        return list;

			},
			searchedItems(){

				var items =  this.items.filter((row)=>{
					var res = Object.values(row).filter((val)=>{
						val = !val ? '' : val;
						val = val.toString().toLowerCase() || '';
						return val.search(this.searchValue.toLowerCase()) > -1;
					})

					return res.length > 0;
				});

				return items;
			},

			outputItems(){

				var list = this.sortedItems;
				var page = this.page;
				var ipp  = this.ipp == -1 ? list.length : parseInt(this.ipp);

		    if (!list || list.length == 0) return [];

        var start =  parseInt(Math.ceil((page - 1) * ipp));
        var end = start + ipp;

        //start = +start; //parse to int
        
        return list.slice(start, end);
			},
			totalResults(){
				return this.searchedItems.length;
			}
		},
		created(){
			this.searchValue 	= this.searchString;
			this.ipp 			= this.itemsPerPage;
			this.page 			= this.pageStart;
		}
	}
</script>

<style scoped="">
	thead th {
		color: grey;
		font-weight: bold !important; 
		padding-top: 10px !important;
		padding-bottom: 10px !important;
		font-size : 12px;

	}

	thead th:hover, thead th.active {
		color: #000 !important;
	}

	tbody td {
		font-size : 12px !important;
	}

	.cursor-pointer {
		cursor: pointer;
		-webkit-user-select: none; /* Safari */        
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}

	.rpp-select {
		width: 70px;
		position: absolute; 
	}

	.font-13 {
		font-size: 13px;
	}

	.pagination {
	   text-align: right;
	}



	/* Progress Bar */
  .progress-container{
    height: 3px;
    position:static;
    display: block;
    width: 100%;
  }
	.progress {
    z-index: 1;
		/* top: 38px; */
		position: relative;
		height: 2px;
		display: block;
		width: 100%;
		background-color: #acece6;
		/* background-color: #dd7e18; */
		border-radius: 0px;
		background-clip: padding-box;
		margin: 0;
		overflow: hidden; 
	}
	.progress .determinate {
	    position: absolute;
	    background-color: inherit;
	    top: 0;
	    bottom: 0;
	    background-color: #26a69a;
	    transition: width .3s linear; }
  	.progress .indeterminate {
   		 background-color: #26a69a; }

    .progress .indeterminate:before {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
              animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite; }
    .progress .indeterminate:after {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
              animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      -webkit-animation-delay: 1.15s;
              animation-delay: 1.15s; }

	@-webkit-keyframes indeterminate {
	  0% {
	    left: -35%;
	    right: 100%; }
	  60% {
	    left: 100%;
	    right: -90%; }
	  100% {
	    left: 100%;
	    right: -90%; } }
	@keyframes indeterminate {
	  0% {
	    left: -35%;
	    right: 100%; }
	  60% {
	    left: 100%;
	    right: -90%; }
	  100% {
	    left: 100%;
	    right: -90%; } }
	@-webkit-keyframes indeterminate-short {
	  0% {
	    left: -200%;
	    right: 100%; }
	  60% {
	    left: 107%;
	    right: -8%; }
	  100% {
	    left: 107%;
	    right: -8%; } }
	@keyframes indeterminate-short {
	  0% {
	    left: -200%;
	    right: 100%; }
	  60% {
	    left: 107%;
	    right: -8%; }
	  100% {
	    left: 107%;
	    right: -8%; } 
	}

</style>
