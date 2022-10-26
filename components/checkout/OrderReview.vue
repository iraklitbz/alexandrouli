<template>
    <div class="mb-5 lg:mb-8">
      <div class="grid grid-cols-12 gap-5 lg:gap-8">
        <div class="col-span-12">
          <p class="form-legend font-bold mb-1.5 lg:mb-2">Delivery</p>

          <ul class="text-sm lg:text-base leading-normal text-contrast-medium">
            <li>Emily Ewing</li>
            <li>86 Whitby Road</li>
            <li>IP20 6JA</li>
            <li>London, UK</li>
            <li>004456788698</li>
          </ul>
        </div>

        <div class="col-span-12">
          <p class="form-legend font-bold mb-1.5 lg:mb-2">Payment Info</p>

          <p class="flex items-center text-sm lg:text-base text-contrast-medium">
            <svg class="icon w-[32px] h-[32px] mr-1.5 lg:mr-2" viewBox="0 0 48 48">
              <title>Visa card</title>
              <g>
                <rect x="1" y="14" fill="#E6E6E6" width="46" height="19"></rect>
                <path fill="#E79800" d="M4,41h40c1.657,0,3-1.343,3-3v-5H1v5C1,39.657,2.343,41,4,41z"></path>
                <path fill="#1A1876" d="M44,7H4c-1.657,0-3,1.343-3,3v5h46v-5C47,8.343,45.657,7,44,7z"></path>
                <polygon fill="#1A1876" points="19.238,28.8 21.847,28.8 23.48,19.224 20.87,19.224 "></polygon>
                <path fill="#1A1876" d="M28.743,23.069c-0.912-0.443-1.471-0.739-1.465-1.187c0-0.398,0.473-0.824,1.495-0.824 c0.836-0.013,1.51,0.157,2.188,0.477l0.354-2.076c-0.517-0.194-1.327-0.402-2.339-0.402c-2.579,0-4.396,1.299-4.411,3.16 c-0.015,1.376,1.297,2.144,2.287,2.602c1.016,0.469,1.358,0.769,1.353,1.188c-0.006,0.642-0.811,0.935-1.562,0.935 c-1.158,0-1.742-0.179-2.793-0.655l-0.366,2.144c0.61,0.267,1.737,0.499,2.908,0.511c2.744,0,4.525-1.284,4.545-3.272 C30.944,24.581,30.249,23.752,28.743,23.069z"></path>
                <path fill="#1A1876" d="M38.007,19.233H35.99c-0.625,0-1.092,0.171-1.367,0.794l-3.876,8.776h2.741c0,0,0.448-1.18,0.55-1.439 c0.3,0,2.962,0.004,3.343,0.004c0.078,0.335,0.318,1.435,0.318,1.435h2.422L38.007,19.233z M34.789,25.406 c0.108-0.276,1.173-3.011,1.386-3.591c0.353,1.651,0.009,0.049,0.781,3.591H34.789z"></path>
                <path fill="#1A1876" d="M17.049,19.231l-2.556,6.53l-0.272-1.327l-0.915-4.401c-0.158-0.606-0.616-0.787-1.183-0.808H7.913 L7.88,19.424c1.024,0.248,1.939,0.606,2.742,1.05l2.321,8.317l2.762-0.003l4.109-9.558H17.049z"></path>
              </g>
            </svg>
            <span>****1234</span>
          </p>
        </div>

        <div class="col-span-12">
          <p class="form-legend font-bold mb-1.5 lg:mb-2">Order Details</p>

          <p class="text-sm lg:text-base leading-normal text-contrast-medium">Gold Membership - $249/Year</p>
        </div>
      </div>
        <div class="fixed bottom-0 left-0 w-full py-6 bg-contrast-lower bg-opacity-20 z-50">
            <div class="w-full flex gap-4 mx-auto max-w-xl">
              <button @click="prevStep()" class="btn btn--subtle w-2/4">Go back</button>
              <button @click="handleSubmit()" class="btn btn--primary w-2/4">BUY</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            step: {
                type: Number,
                default: null
            }
        },
         methods: {
            handleSubmit() {
                console.log('Done')
            },
            prevStep() {
                this.$store.commit('steps/SET_PREV_STEPS', this.step )
            }
        }
    }
</script>
