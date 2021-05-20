import { mount, shallowMount } from '@vue/test-utils'
import Badge from '@/components/Badge.vue'
import TaskCard from '@/components/TaskCard.vue'


describe("Badge.vue", () => {
  const wrapper = shallowMount(Badge);

  test("checks if badge compnent contains class named test", () => {
    expect(wrapper.contains('.test')).toBe(true);

  });

  describe('TaskCard.vue', () => {
//------FAKE TEST RUNS -------------
    // it('should set correct classes for task', async () => {

    //   const TaskCard = {
    //     props: ['color'],
    //     template: '<div>{{color}}</div>'
    //   }

    //   const wrapper = mount(TaskCard, {
    //     propsData: {
    //       color: 'purple',
    //     },
    //   })
    //     expect(wrapper.text()).toBe('purple');
    // });
//----------------------------------
    it('should set correct classes for task', async () => {

      // const TaskCardNew = {
      //   props: ['task.color'],
      //   template: '<div>{{task.color}}</div>'
      // }

      const wrapper = mount(TaskCard, {
        propsData: {
          testcolor: 'purple',
        },
      })
      await wrapper.setData({color: this.propsData.testcolor })
        expect(wrapper.text()).toBe('purple');
    });
    // set custom task object to propsData

    // check if wrapper has correct color class (for example purple task has to have border-purple-400 class)

  })



  // it('should display date in correct format', async () => {

  //   // set custom task object to propsData

  //   // check if date element has correct text

  })