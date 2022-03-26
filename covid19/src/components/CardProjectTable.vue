<template>
  <!-- Projects Table Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title >
      <div class="wrapper" >
      <a-row type="flex" align="middle" class="fixed" >
        <a-col :span="24" :md="12" >
          <h4>Country Statistics</h4>
          <p>Search to check country's status <span class="text-primary">Update everyday</span></p>
        </a-col>

        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <!-- <a-radio-group v-model="projectHeaderBtns" size="small">
						<a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="online">ONLINE</a-radio-button>
						<a-radio-button value="stores">STORES</a-radio-button>
					</a-radio-group> -->
          <a-input-search
            class="header-search"
            :class="searchLoading ? 'loading' : ''"
            placeholder="Type here…"
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
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <a-space
        slot="members"
        slot-scope="members"
        :size="-12"
      >
        <template v-for="member in members">
          <a-avatar :key="member" size="small" :src="member" />
        </template>
      </a-space>

      <template slot="company" slot-scope="company">
        <h6 class="m-0">
          <img :src="company.logo" width="25" class="mr-10" />
          {{ company.name }}
        </h6>
      </template>

      <template slot="completion" slot-scope="completion">
        <span>{{ completion.label ? completion.label : completion }}</span>
        <a-progress
          :percent="completion.value ? completion.value : completion"
          :show-info="false"
          size="small"
          :status="completion.status ? completion.status : 'normal'"
        />
      </template>
    </a-table>
  </a-card>
  <!-- / Projects Table Card -->
</template>

<script>
export default {
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
    };
  },
};
</script>
<style lang="scss">
// .wrapper{
//   position: relative;
// }
// .fixed{
//   position: absolute;
// }
</style>