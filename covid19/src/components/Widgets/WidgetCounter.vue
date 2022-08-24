<template>
	<a-card :bordered="false" class="widget-1">
		<a-statistic
			:title="title"
			:value="value"
		>
		</a-statistic>
		<div class="icon" v-html="icon"></div>
	</a-card>
</template>
<script>
	export default ({
		props: {
			title: {
				type: String,
				default: "",
			},
			value: {
				// type: Number,
				default: 0,
			},
			icon: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
			}
		},
	})
</script>
}<style lang="scss">
.invisible {
  display: none;
}
</style>