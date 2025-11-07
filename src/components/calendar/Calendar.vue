<template>
    <div class="calendar">

        <CalendarHeader />

        <CalendarBody @set-date="setDate" />

    </div>
</template>

<script setup lang="ts">
    import CalendarHeader from './CalendarHeader.vue';
    import CalendarBody from './CalendarBody.vue';

    import { useCalendarStore } from '../../store/calendarStore';

    interface Props {
        date?: string;
    }

    const props = withDefaults(defineProps<Props>(), { date: new Date().toISOString().split('T')[0] });
    const emit = defineEmits(['setDate']);
    const calendarStore = useCalendarStore();

    calendarStore.setDateByString(props.date);

    function setDate(item: string) {
        emit('setDate', item);
    }
</script>

<style lang="scss" scoped>
    .calendar {
        width: fit-content;
        border: 1px solid #0000005d;
        border-radius: .5em;
        text-align: center;
        font-size: inherit;
        color: #696969;
    }
</style>