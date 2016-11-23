<template>
  <div class="notes">
    <h2>What is this?</h2>
    <p>Part of an admin interface to edit the opening hours of a department, building or class.</p>
    
    <h4>Requirements</h4>
    <ol>
      <li>Toggle each day of the week as open or closed</li>
      <li>Set an open and close time for each day</li>
      <li>Allow for a break in the day (eg. open 9am-11am and 1pm-5pm)</li>
      <li>Allow for closing time to be after midnight (eg. 1am the next day)</li>
      <li>Make exceptions for certain dates in the year (eg. closed Christmas Day)</li>
    </ol>
    
    <h4>Usage</h4>
    <ul>
      <li>Click a day of the week to edit its opening hours. Tap the X to close on that day.</li>
      <li>If the closing time is <em>before, or the same as the opening time</em>, it will assume it's open past midnight and add a 'next day' tag</li>
      <li>If the department is closed some time during the day, tap 'Add a break' to add a second set of open hours</li>
      <li>The department might be closed on certain days of the year. Select QLD public holidays from the dropdown list, or type in your own dates to add them to the list</li>
      <li>See the output updated as you edit</li>
      <li>Changes are saved as JSON to your browser's local storage. But could easily be sent to a backend</li>
    </ul>
    
    <h4>Issues</h4>
    <p>Despite its apparent simplicity, there are likely to be many edge-cases, for example:
    <ul>
      <li>A department or class might have multiple 'session times', beyond the single break per day</li>
      <li>A department might be closed for an extended period eg. uni holidays. We would need a date range picker, or allow a date range to be typed in eg. 23/12 - 5/1</li>
    </ul>
    
    <h4>Improvements:</h4>
    <ul>
      <li>Change local storage saving to a more permanent store eg. Firebase</li>
      <li>Pull in a list of current QLD holidays from data.gov.au instead of manually adding holidays</li>
      <li>Add more feedback when changing times (eg. warn if opening time is before closing time)</li>
      <li>Test UI with users to see if their requirements are met or if there are any edge-cases that are more common than assumed</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'notes'
}
</script>

<style lang="sass" scoped>
@import '../assets/scss/variables';

.notes {
  background: $color-yellow;
  padding: $base-padding*2;
  max-width: 760px;
  margin: 0 auto;
  margin-bottom: $base-padding*2;
  
  h2 {
    margin-top: 0;
  }
  
  li {
    padding-bottom: $base-padding/2;
  }
}
</style>
