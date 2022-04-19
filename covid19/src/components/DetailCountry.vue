<template>
  <div class="container">
    <p>{{name}}</p>
    <p>{{symbol}}</p>
  </div>
</template>

<script>

export default {
  props: [
    'name',
    'symbol',
  ]
}
</script>

<style>

</style>