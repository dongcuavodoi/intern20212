<template>
  <a-layout has-sider>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo">
        <a-icon
          type="ant-cloud"
          style="color: white; margin-right: 8px; margin-top: 10px"
        />
        <span class="header">Covid 19</span>
      </div>
    </a-layout-header>
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }"
    >
      <div class="logo" />
      <div class="text-sider">Continents</div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item v-for="(continent, index) in continents"
              :key="'1' +index" class="block-sider"> {{continent.title}}
        </a-menu-item>
      </a-menu>
      <div class="text-sider">Countries</div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item v-for="(country, index) in countries"
              :key="'2' +index" class="block-sider"> {{country.name}}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout
      id="components-layout-demo-fixed"
      :style="{ marginLeft: '125px' }"
    >
      <a-layout-content :style="{ marginLeft: '70px',marginTop: '45px' }">
        <div :style="{ padding: '28px', minHeight: '660px' }">
          <!-- Counter Widgets -->
          <a-row :gutter="24">
            <a-col
              :span="24"
              :lg="12"
              :xl="6"
              class="mb-24"
              v-for="(stat, index) in stats"
              :key="index"
            >
              <WidgetCounter
                :title="stat.title"
                :value="stat.value"
                :icon="stat.icon"
              ></WidgetCounter>
            </a-col>
          </a-row>
          <!-- / Counter Widgets -->
          <!-- Charts -->
          <!-- <a-row
            :gutter="24"
            type="flex"
            align="stretch"
            :style="{ padding: '24px' }"
          >
            <a-col :span="24" :lg="10" class="mb-24">
              <CardBarChart></CardBarChart>
            </a-col>
            <a-col :span="24" :lg="14" class="mb-24">
              <CardLineChart></CardLineChart>
            </a-col>
          </a-row> -->
          <a-row :gutter="24" type="flex" align="stretch">
            <!-- Table -->
            <a-col :span="24" :lg="24" class="mb-24">
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
      <a-layout-footer :style="{ marginTop: '5px',textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>

      <!-- <router-link to="detailcountry">Detail Country</router-link>
      <router-view /> -->
    </a-layout>
  </a-layout>
</template>

<script>
import axios from "axios";
import {countries} from 'country-list-json';
import WidgetCounter from "../src/components/Widgets/WidgetCounter.vue";
// import CardLineChart from "../src/components/CardLineChart.vue";
// import CardBarChart from "../src/components/CardBarChart.vue";
import CardProjectTable from "../src/components/CardProjectTable.vue";
const continents = [
  {title: 'World'},
  {title: 'Asia'},
  {title: 'Africa'},
  {title: 'Australia'},
  {title: 'Europe'},
  {title: 'North America'},
  {title: 'South America'},
  {title: 'Ocenia'},
];
// const countries = [];
const stats = [
  {
    title: "World's Total Cases",
    value: null,
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg>`,
  },
  {
    title: "World's Deaths",
    value: null,
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/>
</svg>`,
  },
  {
    title: "World's Recovered",
    value: null,
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "World's Activated",
    value: null,
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-reverse-fill" viewBox="0 0 16 16">
  <path d="M0 3a2 2 0 0 1 2-2h7.08a2 2 0 0 1 1.519.698l4.843 5.651a1 1 0 0 1 0 1.302L10.6 14.3a2 2 0 0 1-1.52.7H2a2 2 0 0 1-2-2V3zm9.854 2.854a.5.5 0 0 0-.708-.708L7 7.293 4.854 5.146a.5.5 0 1 0-.708.708L6.293 8l-2.147 2.146a.5.5 0 0 0 .708.708L7 8.707l2.146 2.147a.5.5 0 0 0 .708-.708L7.707 8l2.147-2.146z"/>
</svg>`,
  },
  {
    title: "Vietnam's Total Cases",
    value: null,
    icon: `
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg>`,
  },
  {
    title: "Vietnam's Deaths",
    value: null,
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heartbreak-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/>
</svg>`,
  },
  {
    title: "Vietnam's Recovered",
    value: null,
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "Vietnam's Activated",
    value: null,
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-reverse-fill" viewBox="0 0 16 16">
  <path d="M0 3a2 2 0 0 1 2-2h7.08a2 2 0 0 1 1.519.698l4.843 5.651a1 1 0 0 1 0 1.302L10.6 14.3a2 2 0 0 1-1.52.7H2a2 2 0 0 1-2-2V3zm9.854 2.854a.5.5 0 0 0-.708-.708L7 7.293 4.854 5.146a.5.5 0 1 0-.708.708L6.293 8l-2.147 2.146a.5.5 0 0 0 .708.708L7 8.707l2.146 2.147a.5.5 0 0 0 .708-.708L7.707 8l2.147-2.146z"/>
</svg>`,
  },
];
const tableColumns = [
  {
    title: "COUNTRIES",
    dataIndex: "country",
    scopedSlots: { customRender: "country" },
    width: 300,
    class: "font-bold text-muted text-sm",
  },
  {
    title: "TOTAL CASES",
    dataIndex: "totalCases",
    class: "font-bold text-muted text-sm",
    sorter: (a, b) => a.totalCases - b.totalCases,
  },
  {
    title: "TOTAL DEATHS",
    dataIndex: "totalDeaths",
    class: "font-bold text-muted text-sm",
    sorter: (a, b) => a.totalDeaths - b.totalDeaths,
  },
  {
    title: "TOTAL RECOVERED",
    dataIndex: "totalRecovered",
    class: "font-bold text-muted text-sm",
    sorter: (a, b) => a.totalRecovered - b.totalRecovered,
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
var tableOptions = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "da6e3f3cbdmsh556c57bfb493b75p1bdb27jsn15b95419cc8c",
  },
};
var options = {
  method: "GET",
  url: "https://covid19-data.p.rapidapi.com/geojson-ww",
  headers: {
    "X-RapidAPI-Host": "covid19-data.p.rapidapi.com",
    "X-RapidAPI-Key": "da6e3f3cbdmsh556c57bfb493b75p1bdb27jsn15b95419cc8c",
  },
};

export default {
  components: {
    WidgetCounter,
    // CardLineChart,
    // CardBarChart,
    CardProjectTable,
  },
  data() {
    return {
      countryName: "",
      threeLetterSymbol: "",
      tableColumns,
      tableData: [],
      stats,
      continents,
      countries,
    };
  },
  methods: {
    getData() {
      // (this.countryName = "Canada"), (this.threeLetterSymbol = "can");
      // countryOptions.url = `${countryOptions.url}${this.countryName}/${this.threeLetterSymbol}`;
      // console.log(countryOptions.url);
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  async created() {
    axios
      .request(worldOptions)
      .then(function (response) {
        stats[0].value = response.data[0].TotalCases;
        stats[1].value = response.data[0].TotalDeaths;
        stats[2].value = response.data[0].TotalRecovered;
        stats[3].value = response.data[0].ActiveCases;
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .request(vietOptions)
      .then(function (response) {
        stats[4].value = response.data[0].TotalCases;
        stats[5].value = response.data[0].TotalDeaths;
        stats[6].value = response.data[0].TotalRecovered;
        stats[7].value = response.data[0].ActiveCases;
      })
      .catch(function (error) {
        console.error(error);
      });

    const response = await axios.request(tableOptions);
    this.tableData = response.data.map((item, index) => {
      return {
        key: index,
        country: {
          name: item.Country,
          logo: item.ThreeLetterSymbol,
        },
        totalCases: item.TotalCases,
        totalDeaths: item.TotalDeaths,
        totalRecovered: item.TotalRecovered,
      };
    });
  },
};
</script>

<style lang="scss">
.logo {
  color: white;
  width: 120px;
  height: 31px;
  line-height: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.header {
  font-size: 18px;
}
.block-sider{
  width: 100px;
  padding: 15px;
  background-color: #113b5c;
  border-radius: 8px;
  text-align: center;
  margin: 0;
  color: #fff;
}
.block-sider:hover{
  background-color: #0D65A3;
}
.text-sider{
  font-size: 20px;
  color: #fff;
  text-align: center;
}
::-webkit-scrollbar {
  width: 5px;
}
</style>
