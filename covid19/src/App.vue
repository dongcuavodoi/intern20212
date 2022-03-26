<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <country-flag country="vnm" rounded size="big" />
      <div class="logo">
        <a-icon
          type="ant-cloud"
          style="color: white; margin-right: 8px; margin-top: 10px"
        />
        <span class="header">Covid 19</span>
        <button v-on:click="getData">Button</button>
      </div>
      <!-- <a-col :span="12" :md="6" class="header-control">
      </a-col> -->
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ padding: '24px', minHeight: '660px' }">
        <!-- Counter Widgets -->
        <a-row :gutter="24">
          <a-col
            :span="24"
            :lg="12"
            :xl="6"
            class="mb-24"
            v-for="(stat, index) in worldStats"
            :key="index"
          >
            <!-- Widget 1 Card -->
            <WidgetCounter
              :title="stat.title"
              :value="stat.value"
              :prefix="stat.prefix"
              :suffix="stat.suffix"
              :icon="stat.icon"
              :status="stat.status"
            ></WidgetCounter>
            <!-- / Widget 1 Card -->
          </a-col>
          <a-col
            :span="24"
            :lg="12"
            :xl="6"
            class="mb-24"
            v-for="(stat1, index1) in vietStats"
            :key="index1"
          >
            <!-- Widget 1 Card -->
            <WidgetCounter
              :title="stat1.title"
              :value="stat1.value"
              :prefix="stat1.prefix"
              :suffix="stat1.suffix"
              :icon="stat1.icon"
              :status="stat1.status"
            ></WidgetCounter>
            <!-- / Widget 1 Card -->
          </a-col>
        </a-row>
        <!-- / Counter Widgets -->
        <!-- Charts -->
        <a-row
          :gutter="24"
          type="flex"
          align="stretch"
          :style="{ padding: '24px' }"
        >
          <a-col :span="24" :lg="10" class="mb-24">
            <!-- Active Users Card -->
            <CardBarChart></CardBarChart>
            <!-- Active Users Card -->
          </a-col>
          <a-col :span="24" :lg="14" class="mb-24">
            <!-- Sales Overview Card -->
            <CardLineChart></CardLineChart>
            <!-- / Sales Overview Card -->
          </a-col>
        </a-row>
        <a-row :gutter="24" type="flex" align="stretch">
          <!-- Table -->
          <a-col :span="24" :lg="24" class="mb-24 scrollable-container">
            <!-- Projects Table Card -->
            <CardProjectTable
              :data="tableData"
              :columns="tableColumns"
            ></CardProjectTable>
            <!-- / Projects Table Card -->
          </a-col>
          <!-- / Table -->
        </a-row>
        <!-- / Charts -->
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import CountryFlag from "vue-country-flag";
import axios from "axios";
import WidgetCounter from "../src/components/Widgets/WidgetCounter.vue";
import CardLineChart from "../src/components/CardLineChart.vue";
import CardBarChart from "../src/components/CardBarChart.vue";
import CardProjectTable from "../src/components/CardProjectTable.vue";
const worldStats = [
  {
    title: "World's Total Cases",
    value: null,
    prefix: "",
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "World's Total Deaths",
    value: null,
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" fill="#111827"/>
							<path d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z" fill="#111827"/>
							<path d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z" fill="#111827"/>
							<path d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "World's Total Recovered",
    value: null,
    prefix: "",
    status: "danger",
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "World's Active Cases",
    value: null,
    prefix: "",
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
  },
];
const vietStats = [
  {
    title: "Vietnam's Total Cases",
    value: null,
    prefix: "",
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "Vietnam's Total Deaths",
    value: null,
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" fill="#111827"/>
							<path d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z" fill="#111827"/>
							<path d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z" fill="#111827"/>
							<path d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "Vietnam's Total Recovered",
    value: null,
    prefix: "",
    status: "danger",
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "Vietnam's Active Cases",
    value: null,
    prefix: "",
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
  },
];
// "Projects" table list of columns and their properties.
const tableColumns = [
  {
    title: "COUNTRIES",
    dataIndex: "company",
    scopedSlots: { customRender: "company" },
    width: 300,
    class: "font-bold text-muted text-sm",
  },
  {
    title: "TOTAL CASES",
    dataIndex: "members",
    class: "font-bold text-muted text-sm",
  },
  {
    title: "TOTAL DEATHS",
    dataIndex: "budget",
    class: "font-bold text-muted text-sm",
  },
  {
    title: "TOTAL RECOVERED",
    dataIndex: "completion",
    class: "font-bold text-muted text-sm",
  },
];

// "Projects" table list of rows and their properties.
const tableData = [
  {
    key: "",
    company: {
      name: "",
      logo: "",
    },
    members: null,
    budget: null,
    completion: null,
  },
  {
    key: "2",
    company: {
      name: "Progress Track",
      logo: "images/logos/logo-atlassian.svg",
    },
    members: "$2,000",
    budget: "$3,000",
    completion: 10,
  },
  {
    key: "3",
    company: {
      name: "Fix Platform Errors",
      logo: "images/logos/logo-slack.svg",
    },
    members: "$2,000",
    budget: "Not Set",
    completion: 100
  },
  {
    key: "4",
    company: {
      name: "Launch new Mobile App",
      logo: "images/logos/logo-spotify.svg",
    },
    members: "$2,000",
    budget: "$20,600",
    completion: 100
  },
  {
    key: "5",
    company: {
      name: "Add the New Landing Page",
      logo: "images/logos/logo-jira.svg",
    },
    members: "$2,000",
    budget: "$4,000",
    completion: 80,
  },
  {
    key: "6",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "7",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "8",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "9",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "9",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "9",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "9",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "9",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "9",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "10",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "9",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
  {
    key: "9",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: "$2,000",
    budget: "$2,000",
    completion: 80
  },
];
var worldOptions = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "da6e3f3cbdmsh556c57bfb493b75p1bdb27jsn15b95419cc8c",
  },
};
var vietOptions = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Vietnam/vnm",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "da6e3f3cbdmsh556c57bfb493b75p1bdb27jsn15b95419cc8c",
  },
};
var countryOptions = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "da6e3f3cbdmsh556c57bfb493b75p1bdb27jsn15b95419cc8c",
  },
};
var tableOptions = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "da6e3f3cbdmsh556c57bfb493b75p1bdb27jsn15b95419cc8c",
  },
};
export default {
  components: {
    WidgetCounter,
    CardLineChart,
    CardBarChart,
    CardProjectTable,
    CountryFlag,
  },
  data() {
    return {
      // Counter Widgets Stats
      countryName: "",
      threeLetterSymbol: "",
      tableColumns,
      tableData,
      worldStats,
      vietStats,
    };
  },
  methods: {
    async getData() {
      (this.countryName = "Canada"), (this.threeLetterSymbol = "can");
      countryOptions.url = `${countryOptions.url}${this.countryName}/${this.threeLetterSymbol}`;
      console.log(countryOptions.url);
      await axios
        .request(countryOptions)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  // beforeCreate(){
  //   axios
  //       .request(tableOptions)
  //       .then(function (response) {
  //         console.log(response.data[0]);
  //         // response.data.forEach(function(item, i, tableData) {
            
  //         //   // console.log(tableData[i + 1].key)
  //         //   var a = i + 1;
  //         //   tableData[a].key = String(a),
  //         //   tableData[a] = {
  //         //     company: {
  //         //       name : item.Country,
  //         //       logo : item.ThreeLetterSymbol,
  //         //     }
  //         //   };
  //         //   // console.log(tableData[i + 1].company.name);
  //         //   tableData[a].members = item.TotalCases;
  //         //   tableData[a].budget = item.TotalDeaths;
  //         //   tableData[a].completion = item.TotalRecovered;
  //         //   console.log(tableData);
  //         // });
  //           tableData[0] = {
  //             key : String(1),
  //             company: {
  //               name : "USA",
  //               logo : "usa",
  //             },
  //             members : String(123456),
  //             budget : String(1234567),
  //             completion : 12345678,
  //           };
  //           // tableData[0].key = String(2),
  //           // tableData[0].members = 123456;
  //           // tableData[0].budget = 1234567;
  //           // tableData[0].completion = 12345678;
  //           console.log(tableData[0].key);
  //           console.log(tableData);
  //           console.log(tableData[1].key);
  //           this.$forceUpdate();

  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  // },
  created() {
    axios
      .request(worldOptions)
      .then(function (response) {
        // console.log(response.data);
        // console.log(response.data[0].TotalCases);
        // console.log(worldStats[0].value);
        worldStats[0].value = response.data[0].TotalCases;
        worldStats[1].value = response.data[0].TotalDeaths;
        worldStats[2].value = response.data[0].TotalRecovered;
        worldStats[3].value = response.data[0].ActiveCases;
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .request(vietOptions)
      .then(function (response) {
        // console.log(response.data);
        // console.log(response.data[0].TotalCases);
        // console.log(worldStats[0].value);
        vietStats[0].value = response.data[0].TotalCases;
        vietStats[1].value = response.data[0].TotalDeaths;
        vietStats[2].value = response.data[0].TotalRecovered;
        vietStats[3].value = response.data[0].ActiveCases;
      })
      .catch(function (error) {
        console.error(error);
      }),
    axios
        .request(tableOptions)
        .then(function (response) {
          console.log(response.data[0]);
          // response.data.forEach(function(item, i, tableData) {
            
          //   // console.log(tableData[i + 1].key)
          //   var a = i + 1;
          //   tableData[a].key = String(a),
          //   tableData[a] = {
          //     company: {
          //       name : item.Country,
          //       logo : item.ThreeLetterSymbol,
          //     }
          //   };
          //   // console.log(tableData[i + 1].company.name);
          //   tableData[a].members = item.TotalCases;
          //   tableData[a].budget = item.TotalDeaths;
          //   tableData[a].completion = item.TotalRecovered;
          //   console.log(tableData);
          // });
            tableData[0] = {
              key : String(1),
              company: {
                name : "USA",
                logo : "usa",
              },
              members : String(123456),
              budget : String(1234567),
              completion : 12345678,
            };
            // tableData[0].key = String(2),
            // tableData[0].members = 123456;
            // tableData[0].budget = 1234567;
            // tableData[0].completion = 12345678;
            console.log(tableData[0].key);
            console.log(tableData);
            console.log(tableData[1].key);
            this.$forceUpdate();

        })
        .catch(function (error) {
          console.error(error);
        });  
  },
};
</script>

<style lang="scss">
#components-layout-demo-fixed .logo {
  color: white;
  width: 120px;
  height: 31px;
  line-height: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
#components-layout-demo-fixed .header {
  font-size: 18px;
}
.scrollable-container {
  height: 400px;
  overflow-y: scroll;
  background: #fff;
}
</style>
