<template>
  <section id="app">
    <section class="editor">
      <header class="header">
        <h1><input class="title"
          autocomplete="off"
          placeholder="Department name"
          tabindex="0"
          v-model="title"
        > <img src="src/assets/icon-edit.svg" class="icon"></h1> 
       <p><input class="address"
          autocomplete="off"
          placeholder="Address"
          tabindex="1"
          v-model="address"
        > <img src="src/assets/icon-edit.svg" class="icon"></p>
      </header>

      <h2>1. Choose when the {{ title }} is open</h2>
      <ul class="editor-opentimes">
          <single-day :day="day" v-for="(day, index) in weekdays" :class="{ closed: !day.isOpen, 'editor-day': true }"></single-day>
      </ul>
      
      <div class="editor-exclude">
        <h2>2. Close on certain dates (eg. public holidays)</h2>
        <multiselect
          :value="selected"
          :options="excludeList"
          :multiple="true"
          :close-on-select="false"
          :taggable="true"
          :track-by="label"
          @tag="newExcludeDate"
          v-model="excludeDates"
          placeholder="Choose or add a date (dd/mm)"
          label="label"  
        >
        </multiselect>
      </div>
    </section>
    
    <preview :title="title" :address="address" :weekdays="weekdays" :excludeDates="excludeDates"></preview>
    
    <div class="clear"></div>
    
    <explanatory-notes></explanatory-notes>
   
  </section>
</template>

<script>
// localStorage persistence
const STORAGE_KEY = 'qut-task'
const daysStorage = {
  fetch: function () {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    daysStorage.uid = data.length
    return data
  },
  save: function (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

// TODO:  - Improve the weekdays objects
//        - Grab list of public holidays from https://data.gov.au/dataset/b1bc6077-dadd-4f61-9f8c-002ab2cdff10/resource/a24ecaf2-044a-4e66-989c-eacc81ded62f/download/australianpublicholidays-201617.csv.csv


import Day from './components/Day.vue'
import Preview from './components/Preview.vue'
import Notes from './components/Notes.vue'

export default {
  name: 'app',
  components: {
    'single-day': Day,
    'preview': Preview,
    'explanatory-notes': Notes
  },
  data: function () {
    return {
      title: 'QUT Library',
      address: 'Level 5, C Block, 2 George Street, Brisbane City QLD',
      weekdays: [
        { 
          label: 'Monday', 
          isOpen: true, 
          nextDay: false, 
          split: false, 
          open: {h: '8', mm: '00', a: 'am'}, 
          close: {h: '5', mm: '00', a: 'pm'}, 
          open2: {h: '5', mm: '00', a: 'pm'}, 
          close2: {h: '5', mm: '00', a: 'pm'}, 
        },
        { 
          label: 'Tuesday', 
          isOpen: false, 
          nextDay: false, 
          split: false, 
          open: {h: '8', mm: '00', a: 'am'}, 
          close: {h: '5', mm: '00', a: 'pm'}, 
          open2: {h: '5', mm: '00', a: 'pm'},
          close2: {h: '5', mm: '00', a: 'pm'}, 
        },
        { 
          label: 'Wednesday', 
          isOpen: false, 
          nextDay: false, 
          split: false, 
          open: {h: '8', mm: '00', a: 'am'}, 
          close: {h: '5', mm: '00', a: 'pm'}, 
          open2: {h: '5', mm: '00', a: 'pm'},
          close2: {h: '5', mm: '00', a: 'pm'}, 
        },
        { 
          label: 'Thursday', 
          isOpen: false, 
          nextDay: false, 
          split: false, 
          open: {h: '8', mm: '00', a: 'am'}, 
          close: {h: '5', mm: '00', a: 'pm'}, 
          open2: {h: '5', mm: '00', a: 'pm'},
          close2: {h: '5', mm: '00', a: 'pm'}, 
        },
        { 
          label: 'Friday', 
          isOpen: false, 
          nextDay: false, 
          split: false, 
          open: {h: '8', mm: '00', a: 'am'}, 
          close: {h: '5', mm: '00', a: 'pm'}, 
          open2: {h: '5', mm: '00', a: 'pm'},
          close2: {h: '5', mm: '00', a: 'pm'}, 
        },
        { 
          label: 'Saturday', 
          isOpen: false, 
          nextDay: false, 
          split: false, 
          open: {h: '8', mm: '00', a: 'am'}, 
          close: {h: '5', mm: '00', a: 'pm'}, 
          open2: {h: '5', mm: '00', a: 'pm'},
          close2: {h: '5', mm: '00', a: 'pm'}, 
        },
        { 
          label: 'Sunday', 
          isOpen: false, 
          nextDay: false, 
          split: false, 
          open: {h: '8', mm: '00', a: 'am'}, 
          close: {h: '5', mm: '00', a: 'pm'}, 
          open2: {h: '5', mm: '00', a: 'pm'},
          close2: {h: '5', mm: '00', a: 'pm'}, 
        },
      ],
      excludeDates: [],
      weekdayList: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      excludeList: [
        { label: 'New Years Day', date: '2/1' }, 
        { label: 'Australia Day', date: '26/1' }, 
        { label: 'Good Friday', date: '14/4' }, 
        { label: 'Easter Saturday', date: '15/4' }, 
        { label: 'Easter Monday', date: '17/4' }, 
        { label: 'Anzac Day', date: '25/4' }, 
        { label: 'Labour Day', date: '1/5' }, 
        { label: 'EKKA', date: '16/8' }, 
        { label: 'Queen\'s Birthday', date: '2/10' }, 
        { label: 'Christmas', date: '25/12' }, 
        { label: 'Boxing Day', date: '26/12' }
      ]
    }
  },
  created: function() {
    // Fetch previously saved data from localstorage
    const data = daysStorage.fetch()
    if (data.weekdays) {
      this.title = data.title
      this.address = data.address
      this.weekdays = data.weekdays
      this.excludeDates = data.excludeDates
    }
  },
  watch: {
    // Watch for changes and save to localstorage
    // TODO: Compare data before saving to minimise saves
    title: {
      handler: function () {
        this.saveData()
      }
    },     
    address: {
      handler: function () {
        this.saveData()
      }
    },     
    excludeDates: {
      handler: function () {
        this.saveData()
      }
    },    
    weekdays: {
      handler: function (weekdays) {
        this.saveData()
      },
      deep: true
    },
  },
  computed: {
    countOpenDays: function(weekdays) {
      const count = 0;
      for (var i = 0; i < this.weekdays.length; i++) {
        if (this.weekdays[i].isOpen) {
          ++count
        }
      }
      return count
    }
  },
  methods: {  
    updateExcludeDate: function(dates) {
      this.excludeDates = dates
    },
    newExcludeDate: function(date) {
      this.excludeList.push({ label: date, date: date })
      this.excludeDates.push({ label: date, date: date })
    },
    saveData: function() {
      if (this.title) {
        const saveData = { 
          title: this.title, 
          address: this.address, 
          weekdays: this.weekdays, 
          excludeDates: this.excludeDates 
        }
        daysStorage.save(saveData)
      }
    }
  },
  filters: {

  }
}
</script>

<style lang="sass">
@import 'assets/scss/style.scss';
</style>
