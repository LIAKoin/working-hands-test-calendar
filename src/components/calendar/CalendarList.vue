<template>
    <div class="calendar__list">

        <slot></slot>

        <button class="calendar__settings" @click="calendarStore.changeSettings">
            <img src="../../assets/gear.svg" alt="">
        </button>

        <div class="calendar__list-languages" v-if="calendarStore.isSettingsOpened">
            <button
                class="calendar__language"
                :class="{'calendar__language--selected': item === calendarStore.lang}"
                v-for="(item, index) in Object.keys(calendarStore.i18n)"
                :key="index"
                @click="changeLang(item)"
            >
                <img :src="returnFlagSVG(item)" alt="">
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { useCalendarStore } from '../../store/calendarStore';
    import ruFlag from '../../assets/ru.svg';
    import enFlag from '../../assets/en.svg';

    const calendarStore = useCalendarStore();

    function changeLang(lang: string): void {
        calendarStore.changeLang(lang);
    }

    function returnFlagSVG(name: string) {
        switch(name) {
            case 'ru':
                return ruFlag;
            case 'en':
                return enFlag;
        }
    }
</script>

<style lang="scss" scoped>
    .calendar {
        &__list {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: repeat(7, 1fr);

            justify-items: center;
            align-items: center;

            &-languages {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                direction: rtl;

                grid-column: 1/8;
                grid-row: 8;
            }
        }

        &__language {
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 1em;

            transition: all .3s ease-out;

            opacity: 0.7;

            &:hover {
                opacity: 1;
            }

            &--selected {
                opacity: .9;
            }

            > img {
                width: 1.69em;
                height: 1.69em;
            }
        }

        &__settings {
            display: flex;
            justify-content: center;
            align-items: center;

            grid-column: 7;
            grid-row: 7;

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