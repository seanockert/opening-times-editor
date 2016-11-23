<template>
  <section class="preview" id="preview">
    <h4>Preview</h4>
    <h2>{{ title }}</h2>
    <small><a :href="'http://maps.google.com/?q=' + address" title="View the address in Google Maps" target="_blank">{{ address }}</a></small>
    
    <h3>Open {{ openDaysCount() }}</h3>
    <ul class="preview-opentimes">
      <li v-for="day in weekdays">
        <strong>{{ day.label }}: </strong> 
        <span v-if="day.isOpen">
        {{ day.open | formatTime }}-{{ day.close | formatTime }}<span v-if="day.split && day.open2 && day.close2"> and {{ day.open2 | formatTime }}-{{ day.close2 | formatTime }}</span>
        <small v-show="day.nextDay">(next day)</small>
        </span>
        <span v-else>Closed</span>
      </li>
    </ul>

    <p class="output-excluded" v-show="excludeDates.length > 0">
      <strong>Closed on:</strong> <span v-for="(day, index) in excludeDates"> {{ day.label | capitalise }} <span v-if="day.label != day.date">({{ day.date | prettyDate }})</span>{{ listSeparator(index) }}</span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'preview',
  props: ['title', 'address', 'weekdays', 'excludeDates'],
  methods: {
    openDaysCount: function() {
      var count = 0
      const len = this.weekdays.length
      for (var i = 0; i < this.weekdays.length; i++) {
        if (this.weekdays[i].isOpen == true) {
          count++
        }
      }
      
      if (count == 0) {
        return 'never!'
      } else if (count == 1) {
        return '1 day a week'
      } else if (count == len) {
        return 'every day'
      } else if (count == 5 && !this.weekdays[5].isOpen && !this.weekdays[6].isOpen) {
        return 'weekdays'
      }
      return count + ' days a week'
    },
    listSeparator: function(index) {
      const len = this.excludeDates.length  
      if (len == 1 || index == len-1) {
        return ' '
      } else if (index == len-2) {
        return ' & '
      } 
      return ', '
    },
  },
  filters: {
    capitalise: function(string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
      return string
    },
    prettyDate: function(date) {
      if (date) {
        function nth(d) {
          if(d>3 && d<21) return 'th'
          switch (d % 10) {
            case 1:  return 'st'
            case 2:  return 'nd'
            case 3:  return 'rd'
            default: return 'th'
          }
        }
        
        const dateArr = date.split('/');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return dateArr[0] + nth(dateArr[0]) + ' ' + months[dateArr[1]-1]
      }
      return
    },
    formatTime: function(time) {
      if (time.mm == '00') {
        return time.h + time.a
      }
      return time.h + ':' + time.mm + time.a
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/scss/variables';


.preview {
  border: 1px solid #eee;
  background: #f9f9f9;
  padding: $base-padding*2;
  position: relative;
  margin-top: $base-padding*2;
  
  h2 {
    margin: 0;
    margin-bottom: 6px;
  }

  h3 {
    margin: 6px 0;
    margin-top: $base-padding*1.5;
    font-weight: normal;
    font-size: 1em;
    text-transform: uppercase;
    font-size: 0.8em;
  }
  
  h4 {
    position: absolute;
    top: 0;
    right: 0;
    padding: 6px;
    margin: 0;
    line-height: 1;
    background: rgba(0,0,0,0.2);
    color: #fff;
    font-weight: normal;
    text-transform: uppercase;
  }
  
  ul {
    padding: 6px 0 6px 0;
    border-top: 1px solid rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.1);
    
    li {
      padding: $base-padding/4 0;
    }
  }
}

@media (min-width: 700px) {
  .preview {
    float: left;
    width: 29%;
    margin-left: $base-padding*2;
  }   
}
</style>
