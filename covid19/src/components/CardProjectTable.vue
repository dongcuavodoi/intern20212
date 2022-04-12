<template>
  <!-- Projects Table Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <div class="wrapper">
        <a-row type="flex" align="middle" class="fixed">
          <a-col :span="24" :md="12">
            <h4>Country Statistics</h4>
            <p>
              Search to check country's status
              <span class="text-primary">Update everyday</span>
            </p>
          </a-col>

          <a-col
            :span="24"
            :md="12"
            style="
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
          >
            <a-input-search
              class="header-search"
              :class="searchLoading ? 'loading' : ''"
              placeholder="Type here…"
              v-model="search" 
              @search="onSearch"
              :loading="searchLoading"
            >
              <svg
                slot="prefix"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z"
                  fill="#111827"
                />
              </svg>
            </a-input-search>
          </a-col>
        </a-row>
      </div>
    </template>
    <a-table  :columns="columns" :data-source="data" :pagination="false" @onChange="onChange" :scroll="{ y: 540 }">
      <a-space slot="totalCases" slot-scope="totalCases" :size="-12">
        <template v-for="member in totalCases">
          <a-avatar :key="member" size="small" :src="member" />
        </template>
      </a-space>

      <template slot="country" slot-scope="country">
        <h6 class="text m-0">
          <!-- <img :src="country.logo" width="25" class="mr-10" /> -->
          {{ country.name }}
        </h6>
        <country-flag
          :country="country.logo"
          size="normal"
          style="float: left"
        />
      </template>

      <template slot="totalRecovered" slot-scope="totalRecovered">
        <span>{{ totalRecovered.label ? totalRecovered.label : totalRecovered }}</span>
        <a-progress
          :percent="totalRecovered.value ? totalRecovered.value : totalRecovered"
          :show-info="false"
          size="small"
          :status="totalRecovered.status ? totalRecovered.status : 'normal'"
        />
      </template>
    </a-table>
  </a-card>
  <!-- / Projects Table Card -->
</template>

<script>
import CountryFlag from "vue-country-flag";
const searchData = [

]
export default {
  components: {
    CountryFlag
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // Active button for the "Projects" table's card header radio button group.
      projectHeaderBtns: "all",
      searchLoading: false,
      isSearch : false,
      searchData,
    };
  },
  methods:{
    onSearch(value){
      this.data.forEach(function(item){
        if(item.country.name.includes(value) ){
          searchData.push(item)
        }
      });
      if(value == ''){
        this.searchData = [];
      }
      console.log(this.isSearch);
      console.log(this.searchData);
      console.log(value);
      // console.log(this.search);
    },
    onChange(pagination, filters, sorter, extra) {
      console.log("params", pagination, filters, sorter, extra);
    },
  },
  computed:{
    resultSearch(){
      // console.log(this.search);
      return this.data.filter(item => {
        return item.country.name.toLowerCase().includes(this.search.toLowerCase())
      })

    }
  }

};
</script>
<style lang="scss">
.text {
  line-height: 40px;
  display: inline-block;
  padding-left: 20px;
}
// .wrapper{
//   position: relative;
// }
// .fixed{
//   position: absolute;
// }
</style>
