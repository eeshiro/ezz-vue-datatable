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
				:refresh="refresh"
				:select="select"
				:from="from"
				:to="to"
				:data="$data"
				:instance="instance"
				:totalResults="totalResults"
				:setPage="setPage"
				:totalPages="totalPages"
				:page="page">
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
						:refresh="refresh"
						:select="select"
						:from="from"
						:to="to"
						:data="$data"
						:instance="instance"
						:totalResults="totalResults"
						:setPage="setPage"
						:totalPages="totalPages"
						:page="page"/>

					<slot name="entries"
		  				:items="items" 
						:headers="headers" 
						:selected="selected" 
						:allSelected="allSelected" 
						:range="range"
						:sort="sort"
						:refresh="refresh"
						:select="select"
						:from="from"
						:to="to"
						:data="$data"
						:instance="instance"
						:totalResults="totalResults"
						:setPage="setPage"
						:totalPages="totalPages"
						:page="page">

						<div class="input-group input-group-sm p-0 mr-1" 
							style="width: 180px !important"  
							v-if="action && showEntriesOption">

							<div class="input-group-prepend">
							    <small class="input-group-text border-0">Show</small>
							</div>
							<select v-model="ipp" class="form-control form-control-sm text-right p-0">
								<option v-for="o in entriesOptions" :value="o">{{o !== -1 ? o : 'All' }}</option>
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
						:refresh="refresh"
						:select="select"
						:from="from"
						:to="to"
						:data="$data"
						:instance="instance"
						:totalResults="totalResults"
						:setPage="setPage"
						:totalPages="totalPages"
						:page="page"/>	
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
										:refresh="refresh"
										:select="select"
										:from="from"
										:to="to"
										:data="$data"
										:instance="instance"
										:totalResults="totalResults"
										:setPage="setPage"
										:totalPages="totalPages"
										:page="page"/>
							  	</div>

							  	<slot name="search" 
									:items="items" 
									:headers="headers" 
									:selected="selected" 
									:allSelected="allSelected" 
									:range="range"
									:sort="sort"
									:refresh="refresh"
									:select="select"
									:from="from"
									:to="to"
									:data="$data"
									:instance="instance"
									:totalResults="totalResults"
									:setPage="setPage"
									:totalPages="totalPages"
									:page="page">

							  		<input type="text" 
							  			placeholder="Search..." 
							  			class="form-control  rounded-0 m-0 " 
							  			v-model= "searchValue" 
							  			style="width: 200px!important;">
							  	</slot>
							  
							  	<slot name="search-after" 
									:items="items" 
									:headers="headers" 
									:selected="selected" 
									:allSelected="allSelected" 
									:range="range"
									:sort="sort"
									:refresh="refresh"
									:select="select"
									:from="from"
									:to="to"
									:data="$data"
									:instance="instance"
									:totalResults="totalResults"
									:setPage="setPage"
									:totalPages="totalPages"
									:page="page"/>
							</div>	
						</div>
						
					</div>
				</div>
			</div>
			<transition name="fade" v-if="showLoading">
				<div class="progress" v-show="busy">
				  <div class="indeterminate"></div>
				</div>
			</transition>
			<table :class="tableClass">
				<thead>
					<tr>
						<slot name="header" 
							:items="items" 
							:headers="headers" 
							:selected="selected" 
							:allSelected="allSelected" 
							:range="range"
							:sort="sort"
							:refresh="refresh"
							:select="select"
							:from="from"
							:to="to"
							:data="$data"
							:instance="instance"
							:totalResults="totalResults"
							:setPage="setPage"
							:totalPages="totalPages"
							:page="page">

							<th align="center" v-if="showSelect || singleSelect">
								<span class="" v-if="showSelect">
									<input type="checkbox" style="zoom: 1.5" v-model="allSelected">
								</span>
							</th>

							<th v-for="header in headers"
								@click="header.sortable == true ? sort(header.value): ''" 
								:style="header.style || {'font-weight': 'lighter'}"
								:class="[ 'text-' + header.align, header.class, header.sortable ? 'cursor-pointer' : '']">

								{{header.text}}
								<i v-if="header.sortable" :class="['fa', sortBy == header.value ? (inverse === true ? 'fa-arrow-down' : 'fa-arrow-up') : '']"></i>
							</th>
								
						</slot>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, i) in items" @click="showSelect  ? item.selected = !item.selected : (singleSelect ? select(item) : '')">
						<slot name="items"  
							:item="item" 
							:items="items" 
							:headers="headers" 
							:selected="selected" 
							:allSelected="allSelected" 
							:range="range"
							:sort="sort"
							:refresh="refresh"
							:select="select"
							:from="from"
							:to="to"
							:data="$data"
							:instance="instance"
							:totalResults="totalResults"
							:setPage="setPage"
							:totalPages="totalPages"
							:page="page">

							<td align="center" v-if="showSelect || singleSelect">
								<input type="checkbox" style="zoom: 1.5" v-model="item.selected">
							</td>
							<td v-for="header in headers" :align="header.align">{{item[header.value]}}</td>
						</slot>
					</tr>
					<tr v-if="items.length == 0">
						<td colspan="100%" class="text-center p-3 text-secondary"> {{ busy ? loadingText :  noResultsText}}</td>
					</tr>
				</tbody>
			</table>

			<div v-if="action" v-show="items.length > 0" class="col-4 p-0" >
				<div class="form-group mb-2">
					<slot name="status-bar"
						:items="items" 
						:headers="headers" 
						:selected="selected" 
						:allSelected="allSelected" 
						:range="range"
						:sort="sort"
						:refresh="refresh"
						:select="select"
						:from="from"
						:to="to"
						:data="$data"
						:instance="instance"
						:totalResults="totalResults"
						:setPage="setPage"
						:totalPages="totalPages"
						:page="page">
				    	<span class="font-13 text-secondary">Showing {{from}} to {{to}} of {{totalResults}} entries </span>
				    </slot>
				</div>
			</div>
			<div v-if="action" v-show="items.length > 0" class="col-8 p-0 align-self-end " >
				<slot name="pagination-before"
						:items="items" 
						:headers="headers" 
						:selected="selected" 
						:allSelected="allSelected" 
						:range="range"
						:sort="sort"
						:refresh="refresh"
						:select="select"
						:from="from"
						:to="to"
						:data="$data"
						:instance="instance"
						:totalResults="totalResults"
						:setPage="setPage"
						:totalPages="totalPages"
						:page="page"/>

				<slot name="pagination"
						:items="items" 
						:headers="headers" 
						:selected="selected" 
						:allSelected="allSelected" 
						:range="range"
						:sort="sort"
						:refresh="refresh"
						:select="select"
						:from="from"
						:to="to"
						:data="$data"
						:instance="instance"
						:totalResults="totalResults"
						:setPage="setPage"
						:totalPages="totalPages"
						:page="page">
					<ul class="pagination pagination-sm justify-content-end">

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
					    <li v-for="r in range" :class="['page-item', 'cursor-pointer', r == page ? 'active' : '' ]"  @click=" r != page ? page = r : ''">
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
						:refresh="refresh"
						:select="select"
						:from="from"
						:to="to"
						:data="$data"
						:instance="instance"
						:totalResults="totalResults"
						:setPage="setPage"
						:totalPages="totalPages"
						:page="page"/>
			</div>

			<slot name="bottom" 
				:items="items" 
				:headers="headers" 
				:selected="selected" 
				:allSelected="allSelected" 
				:range="range"
				:sort="sort"
				:refresh="refresh"
				:select="select"
				:from="from"
				:to="to"
				:data="$data"
				:instance="instance"
				:totalResults="totalResults"
				:setPage="setPage"
				:totalPages="totalPages"
				:page="page">
			</slot>

		</div>
	</div>
</template>
<script>
	import $ from 'jquery';

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
			headers: {
				type : Array,
				required : true
			},
			url: {
				type : String,
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

			requestWith  : {
				type : Object,
				default : ()=>({})
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
			}
		},

		data : ()=>({
			items : [],
			sortBy : '',
			inverse : false,
			timeOut : null,
			totalResults : 0,
			totalPages : null,
			searchValue : '',
			page : 1,
			ipp : null,
			busy : false,
		}),
		methods : {
			sort(value){
				if(value != this.sortBy)
					this.inverse = true;
				else{
					this.inverse = !this.inverse;
				}
				this.sortBy = value;

				//console.log(this.sortBy);

				this.refresh();

			},
			refresh(){
				this.busy = true;
				clearTimeout(this.timeOut);
				this.timeOut = setTimeout(()=>{
					this.getData();
				}, 300);
			},
			addSelectionOption(data){
				data.forEach((row)=>{
					Object.assign(row, {selected : false});
				})

				return data;
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
				this.page = page;
			},
			getData(){
				this.busy = true;
				var data = {
					search : this.searchValue,
					orderBy : this.sortBy.length > 0 ? this.sortBy + ' ' + (this.inverse ? 'DESC' : 'ASC')  : '',
					page : this.page,
					result_per_page : this.ipp,
				}

				//console.log(data);

				Object.assign(data, this.requestWith);

				$.get({
					url : this.url,
					data : data,
					dataType: 'json',
					success : (res)=>{

						if(this.showSelect || this.singleSelect)
							this.items = this.addSelectionOption(res.data || []);
						else
							this.items = res.data || [];

						
						this.totalResults = parseInt(res.total_results);

						var ipp  = this.ipp == -1 ? this.totalResults : this.ipp;
						this.totalPages = Math.ceil(this.totalResults / ipp);
						this.busy = false;

						console.log(res);
					}
				})
			},
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
			page(){
				this.refresh();
			},
			searchValue(){
				this.page = 1;
				this.refresh();
			},
			ipp(){
				this.page = 1;
				this.refresh();
			},
		},
		computed : {
			range(){
				var page = this.page;
				var from = Math.floor( page / this.maxPageVisible ) * this.maxPageVisible;

				
		        var to  =  (from + this.maxPageVisible) < this.totalPages ? (from + this.maxPageVisible) : this.totalPages;
		       	console.log(from, to);
		        var range = [];
		        for(var c = from; c < to; c ++){
		            range.push(c + 1);
		        }

		        return range;
			},
			from(){
				return (this.page - 1) * this.itemsPerPage + 1;
			},
			to(){
				return this.from + this.items.length -1;
			},
			allSelected : {
				set(val){
					//console.log(val);

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
			instance(){
				return this;
			}
		},
		mounted(){
			this.searchValue 	= this.searchString;
			this.ipp 			= this.itemsPerPage;
			this.page 			= this.pageStart;
		}
	}
</script>

<style scoped="">
	table {

	}

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
	.progress {
		top: 38px;
		position: absolute;
		height: 2px;
		display: block;
		width: 100%;
		background-color: #acece6;
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