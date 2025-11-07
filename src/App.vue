<template>
    <div class="app__wrapper">
        <Calendar :date="'2014-10-10'" @set-date="setDate"/>
    </div>
</template>

<script setup lang="ts">
    import Calendar from './components/calendar/Calendar.vue';

    function setDate(item: string) {
        console.log(item);
    }
</script>

<style lang="scss" scoped>
    .app__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 10px;

        width: 100%;
        height: 100%;
    }
</style>
