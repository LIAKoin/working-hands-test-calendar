<template>
    <header class="calendar__header">

    <button class="calendar__button" @click="calendarStore.changeHeader(-1)">
        <img src="../../assets/caret-left.svg" alt="<" class="calendar__icon">
    </button>

    <button class="calendar__button" @click="calendarStore.changePage">
        <span class="calendar__text">{{ calendarStore.currentMonthName }} {{ calendarStore.currentDate.year }}</span>
    </button>

    <button class="calendar__button" @click="calendarStore.changeHeader(1)">
        <img src="../../assets/caret-right.svg" alt=">" class="calendar__icon">
    </button>

    </header>
</template>

<script setup lang="ts">
    import { useCalendarStore } from '../../store/calendarStore';

    const calendarStore = useCalendarStore();
</script>

<style lang="scss" scoped>
    .calendar {
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: .5em 1em;
        }

        &__button {
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 1em;

            transition: all .3s ease-out;

            &:hover {
                opacity: 0.7;
            }

            > img {
                height: 1em;
            }
        }
    }
</style>