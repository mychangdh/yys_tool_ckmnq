<template>
    <view class="icon">
    </view>
</template>
<script lang="ts"  setup>
const props = defineProps({
    title: {
        type: String ,
        default: 'SP'
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    }

})
let scaleWidth = (props.width ? props.width : (props.height ? props.height * 80 / 49 : 80)) / 80
let scaleHeight = (props.height ? props.height : (props.width ? props.width * 49 / 80 : 49)) / 49
type levelType = 'N' | 'R' | 'SR' | 'SSR' | 'SP'
const coordinate: {
    [key in levelType]: string[]
} = {
    N: ['-1132px', '-703px'],
    R: ['-1247px', '-885px'],
    SR: ['-1212px', '-703px'],
    SSR: ['-1372px', '-703px'],
    SP: ['-1292px', '-703px'],
}

</script>
<style lang='scss' scoped>
.icon {
    margin: auto;
    width: 80px;
	transform-origin: 0 0;
    height: 49px;
    transform: scale(v-bind(scaleWidth), v-bind(scaleHeight));
    background: url(@/static/pages.png) no-repeat;
    background-position: v-bind('coordinate[props.title][0]') v-bind('coordinate[props.title][1]');
}
</style>