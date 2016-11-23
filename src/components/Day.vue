<template>
  <li>
  	<div v-if="!day.isOpen" @click.prevent="toggleOpen(day)">
  		<h3>
  		Closed on {{ day.label }} 
  		<a href="#" class="right btn-open" title="Open on this day" :tabindex=index+2>Open</a>
  		</h3>
  	</div>
  	<div v-else>
  		<h3>
  		{{ day.label }} 
  		<a href="#" @click.prevent="toggleOpen(day)" class="btn-close" title="Close on this day">&times;</a>
  		</h3>
  		<label>Open from</label> 
  		<vue-timepicker format="h:mma" v-model="day.open" hide-clear-button></vue-timepicker> 
  		<span>
  		<label>to <small v-show="day.nextDay && !day.split">next day</small></label> 
  		<vue-timepicker format="h:mma" v-model="day.close" @change="compareCloseTime(day)" hide-clear-button></vue-timepicker> 
  		</span> 
  		<div class="editor-break">
  		<label class="editor-option"><input type="checkbox" id="secondOpen" name="secondOpen" @click="toggleSplit(day)" v-model="day.split">
  		<span v-if="!day.split">Add another opening time?</span>
  		<span v-else>Remove this</span>
  		</label>
  		<p v-show="day.split">
  		  <label>Then from</label> 
  		  <vue-timepicker format="h:mma" v-model="day.open2" hide-clear-button></vue-timepicker> <span><label>to <small v-show="day.nextDay">next day</small> </label> <vue-timepicker format="h:mma" v-model="day.close2" @change="compareCloseTime(day)" hide-clear-button></vue-timepicker> </span>
  		</p>
  		</div>
  	</div>
  </li>
</template>

<script>
export default {
  name: 'day',
  props: ['day'],
  methods: {
  	toggleOpen: function(day) {
      day.isOpen = !day.isOpen
    },
    toggleSplit: function(day) {
      day.split = !day.split
      if (!day.split) day.close = day.close2
    },
    compareCloseTime: function(day) {
      const openTime = this.$options.filters.formatTime24(day.open)
      var closeTime = ''
      // Use the second close time if split is true
      if (!day.split) { 
        closeTime = this.$options.filters.formatTime24(day.close)
      } else {
        closeTime = this.$options.filters.formatTime24(day.close2) 
      }
      day.nextDay = Date.parse('01/01/2000 ' + closeTime ) <= Date.parse('01/01/2000 ' + openTime )
    }
  },
  filters: {
  	formatTime24: function(time) {
      // Convert time to 24 hours
      var hour = time.h;
      if(time.a != 'am' && hour == 12) hour = 0
      if(time.a == 'pm' && hour < 12) hour = parseInt(hour) + 12
      return hour + ':' + time.mm + ':00'
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/scss/variables';
@import '../assets/scss/timepicker';

ul > li {
  background: #f9f9f9;
  position: relative;
  padding: 0;
  
  > div {
    padding: $base-padding;
    border-bottom: 1px solid #ddd;
    border-left: 6px solid $color-green;
    display: block
  }

  h3 {
    margin: 0;
    margin-bottom: 6px;
    padding: 0
  }
  
  label {
    display: inline-block;
    width: 90px;
    text-align: right
  }
  
  p { margin-bottom: 0 }
  
  span { white-space: nowrap }
  
  small {
    background: #ffc018;
    color: #4c1909;
    text-transform: uppercase;
    display: inline-block;
    line-height: 1;
    padding: 5px 8px;
    border-radius: $base-padding;
    font-size: 0.73em;
  }
  
  .right { float: right }
  
  .editor-break {
    margin-top: 6px;
    background: #eee;
    padding:6px;
    
    label.editor-option {
      width: 100%;
      text-align: left;
    }
    
    p {
      margin-top: 6px
    }
    
    input[type='text'] {
      background: #fff;
    }
  }
  
  &.closed {
    > div {
      padding: $base-padding $base-padding $base-padding 6px;
      color: #666;
      cursor: pointer;
      border-left: 6px solid #f9f9f9;
    }
    
    h3 { 
      margin: 0;
      font-weight: normal 
    }  
    
    &:hover, &:active {
      background: #f1f1f1;
      transform: scale(1.02);
      color: #444
    }
  }
}

a.btn-open {
  position: absolute;
  right: 0;
  top: 0;
  padding: $base-padding;
}

li.closed:hover {
  a.btn-open {
    background: $color-green;
    color: #fff;
  }
}

a.btn-close {
  text-decoration: none;
  color: #666;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 16px;
  font-size: 1.5em;
  line-height: 1;
  font-weight: normal;
  
  &:hover {
    color: $color-red;
  }
}

@media (min-width: 700px) {
  ul > li { 
    > div { padding: $base-padding*1.5 }
    &.closed > div { padding: $base-padding $base-padding $base-padding $base-padding/2 }
    
    label {
      display: inline;
      width: auto;
      text-align: left;
    }
  }
}
</style>
