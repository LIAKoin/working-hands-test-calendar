<template>
    <section class="calendar__body">

        <CalendarList v-if="calendarStore.currentPage === 'day'">

            <div 
                class="calendar__list-item calendar__list-item--week-name"
                v-for="(item, index) in calendarStore.weekNames"
                :key="index">
                {{ item }}
            </div>

            <div
                class="calendar__list-item"
                v-for="index in calendarStore.daysData.firstWeekDay"
                :key="index"
            />

            <button
                class="calendar__list-item calendar__list-item--selectable"
                :class="{'calendar__list-item--selectable--selected': index === calendarStore.pickedDate.day && calendarStore.pickedDate.month === calendarStore.currentDate.month}"
                v-for="index in calendarStore.daysData.totalDays"
                :key="index"
                @click="setDate(index)"
            >
                {{ index }}
            </button>

        </CalendarList>

        <CalendarList v-else>

            <div class="calendar__list-wrapper">

                <button
                    class="calendar__list-item calendar__list-item--selectable"
                    v-for="(item, index) in calendarStore.monthNames"
                    :key="index"
                    @click="calendarStore.pickMonth(index + 1)"
                >
                    {{ item }}
                </button>

            </div>

        </CalendarList>

    </section>
</template>

<script setup lang="ts">
    import CalendarList from './CalendarList.vue';

    import { useCalendarStore } from '../../store/calendarStore';

    const calendarStore = useCalendarStore();
    const emit = defineEmits(['setDate']);

    function setDate(index: number) {
        calendarStore.pickDate(index);
        emit('setDate', calendarStore.returnPickedDate());
    }
</script>

<style lang="scss" scoped>
    .calendar {
        &__list {
            &-wrapper {
                display: grid;
                justify-items: center;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: repeat(5, 1fr);
                grid-column: 2 / 7;
                grid-row: 2 / 7;
            }

            &-item {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 2.25em;
                height: 2.25em;

                font-size: .75em;

                &--week-name {
                    font-size: .6em;
                }

                &--selectable {
                    
                    border-radius: .2em;

                    transition: all .3s ease-out;

                    &:hover {
                        background: #00000023;
                    }

                    &--selected {
                        background: #00000017;
                    }
                }
            }
        }
    }
</style>