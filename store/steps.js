export const state = () => ({
    steps: [
        {
            step: 0,
            title: 'Contact Info',
            component: 'ContactInfo',
            current: true,
            completed: false
        },
        {
            step: 1,
            title: 'Delivery',
            component: 'Delivery',
            current: false,
            completed: false
        },
        {
            step: 2,
            title: 'Payment Info',
            component: 'Payment',
            current: false,
            completed: false
        },
        {
            step: 3,
            title: 'Order Review',
            component: 'OrderReview',
            current: false,
            completed: false
        }
    ]
})

export const mutations = {
    SET_NEXT_STEPS (state, payload) {
        state.steps.forEach((step, index) => {
            if (index === payload) {
                step.current = true
            } else {
                step.current = false
            }
            if(index < payload) {
                step.completed = true
            }
        })
        state.steps.filter(item => {
            if(item.step === payload) {
                state.steps[payload].current = false
                state.steps[payload].completed = true
                state.steps[payload + 1].current = true
            }
        })
    },
    SET_PREV_STEPS (state, payload) {
        state.steps.filter(item => {
            if(item.step === payload) {
                state.steps[payload].current = false
                state.steps[payload - 1].completed = false
                state.steps[payload - 1].current = true
            }
        })
    }
}


export const getters = {
    getCounters (state) {
        return state.counter
    }
}
