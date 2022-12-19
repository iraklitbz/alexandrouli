<template>
    <div>
        <ul v-if="dataArray.length" class="flex flex-wrap gap-3 js-choice-tags">
            <li>
              
            </li>
            <li>
                <label @click="handleFilter('Todos')" class="inline-flex items-center py-3 px-4 rounded-full shadow-[0_0_0_1px_hsl(var(--color-contrast-lower))] cursor-pointer select-none text-[0.9375rem] transition-all duration-200 hover:shadow-[0_0_0_1px_hsl(var(--color-contrast-medium))] active:shadow-[0_0_0_2px_hsl(var(--color-primary)),_0_0_0_4px_hsla(var(--color-primary)_/_0.2)] focus-within:shadow-[0_0_0_2px_hsl(var(--color-primary)),_0_0_0_4px_hsla(var(--color-primary)_/_0.2)] [&.choice-tag--checked]:shadow-[0_0_0_2px_hsl(var(--color-primary))] focus-within:[&:not(.choice-tag--checked)]:shadow-[0_0_0_1px_hsl(var(--color-contrast-higher)),_0_0_0_3px_hsla(var(--color-contrast-higher)_/_0.2)] [&.choice-tag--checked]:bg-primary/[0.08] choice-tag--checkbox js-choice-tag" for="checkbox-tag-phone-call">
                    <input 
                        class="sr-only peer" 
                        type="checkbox" 
                        id="('checkbox-tag-todos')"
                        :checked="isSelectedTag.includes('Todos')" 
                    >
                    <svg class="choice-tag__icon text-contrast-low peer-checked:text-primary text-[16px] mr-2 h-[1em] w-[1em] inline-block fill-current shrink-none leading-none" viewBox="0 0 16 16" aria-hidden="true"><g class="choice-tag__icon-group" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"><line x1="-6" y1="8" x2="8" y2="8" /><line x1="8" y1="8" x2="22" y2="8"/><line x1="8" y1="2" x2="8" y2="14"/></g></svg>
                    <span class="leading-tight">Todos</span>
                </label>
            </li>
            <li
                v-for="(element, index) in dataArray"
                :key="index"
            >
                <label @click="handleFilter(element.attributes.slug, `filters[${filterName}][slug][$eq]=${element.attributes.slug}`)" class="inline-flex items-center py-3 px-4 rounded-full shadow-[0_0_0_1px_hsl(var(--color-contrast-lower))] cursor-pointer select-none text-[0.9375rem] transition-all duration-200 hover:shadow-[0_0_0_1px_hsl(var(--color-contrast-medium))] active:shadow-[0_0_0_2px_hsl(var(--color-primary)),_0_0_0_4px_hsla(var(--color-primary)_/_0.2)] focus-within:shadow-[0_0_0_2px_hsl(var(--color-primary)),_0_0_0_4px_hsla(var(--color-primary)_/_0.2)] [&.choice-tag--checked]:shadow-[0_0_0_2px_hsl(var(--color-primary))] focus-within:[&:not(.choice-tag--checked)]:shadow-[0_0_0_1px_hsl(var(--color-contrast-higher)),_0_0_0_3px_hsla(var(--color-contrast-higher)_/_0.2)] [&.choice-tag--checked]:bg-primary/[0.08] choice-tag--checkbox js-choice-tag" for="checkbox-tag-phone-call">
                    <input 
                        class="sr-only peer" 
                        type="checkbox" 
                        :id="('checkbox-tag-' + element.attributes.slug)"
                        :checked="isSelectedTag.includes(element.attributes.slug)"
                    >
            
                    <svg class="choice-tag__icon text-contrast-low peer-checked:text-primary text-[16px] mr-2 h-[1em] w-[1em] inline-block fill-current shrink-none leading-none" viewBox="0 0 16 16" aria-hidden="true"><g class="choice-tag__icon-group" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"><line x1="-6" y1="8" x2="8" y2="8" /><line x1="8" y1="8" x2="22" y2="8"/><line x1="8" y1="2" x2="8" y2="14"/></g></svg>
            
                    <span class="leading-tight">{{element.attributes.title}}</span>
                </label>
            </li>
            
        </ul>
        </div>
</template>

<script>
import choiseTags from "~/plugins/choiseTags.js";
import axios from 'axios';
export default {
    props : {
        filterData : {
            type : String,
            required : true
        },
        filterName : {
            type : String,
            required : true
        }
    },
    data() {
        return {
            isSelectedTag: ['Todos'],
            isSelectedFilter: ['Todos'],
            dataArray: []
        }
    },
    watch: {
      isSelectedTag: function (newVal, oldVal) {
            if(!this.isSelectedTag.length) {
                this.isSelectedTag = ['Todos']
                if(this.$route.query && this.$route.query.filter) {
                    this.$router.push({ })
                }
            }
            if(!this.isSelectedTag.includes('Todos')) {
                const paramsQueryToFilter = this.isSelectedTag.join('&')
                this.$router.push({ query: {filter: paramsQueryToFilter} });
            }
        }
    },
    mounted () {
            choiseTags()
            if(this.$route.query && this.$route.query.filter) {
              this.isSelectedTag = this.$route.query.filter.split('&')
              const splitFilterParams = this.$route.query.filter.split('&')
              this.isSelectedFilter = splitFilterParams.map(element => {
                    return `filters[category][slug][$eq]=${element}`
              })
            }
            this.currentPage = this.$route.params.id
            axios
            .get(process.env.strapiUrl + `/api/${this.filterData}`)
            .then(response => (
                this.dataArray = response.data.data
            ))
            .catch(error => (this.error = error))
        },
        methods: {
            handleFilter(dataToFilter, dataQuery) {
                if (this.isSelectedTag.includes(dataToFilter)) {
                    this.isSelectedTag = this.isSelectedTag.filter(element => element !== dataToFilter)
                    this.isSelectedFilter = this.isSelectedFilter.filter(element => element !== dataQuery)
                } else {
                    if(dataToFilter === 'Todos') {
                        this.isSelectedTag = ['Todos']
                        this.isSelectedFilter = ['Todos']
                        if(this.$route.query && this.$route.query.filter) {
                          this.$router.push({ })
                        }
                    } else {
                        this.isSelectedTag = this.isSelectedTag.filter(element => element !== 'Todos')
                        this.isSelectedFilter = this.isSelectedFilter.filter(element => element !== 'Todos')
                        this.isSelectedFilter.push(dataQuery)
                        this.isSelectedTag.push(dataToFilter)
                    }
                }
                this.$emit("update-filter", this.isSelectedFilter);
            }
        }
}
</script>

<style lang="scss">

.choice-tag--checkbox input:checked + .choice-tag__icon .choice-tag__icon-group :nth-child(1) {
  stroke-dashoffset: 23;
  transform: translateX(-2px) translateY(4px) rotate(45deg);
}

.choice-tag--checkbox input:checked + .choice-tag__icon .choice-tag__icon-group :nth-child(2) {
  stroke-dashoffset: 5;
  transform: translateX(-2px) translateY(4px) rotate(-45deg);
}

.choice-tag--checkbox input:checked + .choice-tag__icon .choice-tag__icon-group :nth-child(3) {
  transition: none;
  stroke-dashoffset: 16;
  opacity: 0;
}

.choice-tag--radio input:checked + .choice-tag__icon .choice-tag__icon-group :nth-child(2) {
  transform: scale(1);
}

.choice-tag__icon-group * {
  transform-origin: 8px 8px;
}

.choice-tag--checkbox .choice-tag__icon-group {
  stroke-width: 2px;
}

.choice-tag--checkbox .choice-tag__icon-group * {
  stroke-dasharray: 16;
}

.choice-tag--checkbox .choice-tag__icon-group :nth-child(1),
.choice-tag--checkbox .choice-tag__icon-group :nth-child(2) {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), stroke-dashoffset 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.choice-tag--checkbox .choice-tag__icon-group :nth-child(1) {
  stroke-dashoffset: 24;
}

.choice-tag--checkbox .choice-tag__icon-group :nth-child(2) {
  stroke-dashoffset: 10;
}

.choice-tag--checkbox .choice-tag__icon-group :nth-child(3) {
  transition: stroke-dashoffset 0.3s;
  stroke-dashoffset: 0;
}

.choice-tag--radio .choice-tag__icon-group :nth-child(1) {
  stroke-width: 1px;
}

.choice-tag--radio .choice-tag__icon-group :nth-child(2) {
  transform: scale(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
