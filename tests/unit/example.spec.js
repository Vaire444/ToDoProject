import { mount, shallowMount } from '@vue/test-utils'
import Badge from '@/components/Badge.vue'
import TaskCard from '@/components/TaskCard.vue'


describe("Badge.vue", () => {
  const wrapper = shallowMount(Badge);

  test("checks if badge compnent contains class named test", () => {
    expect(wrapper.contains('.test')).toBe(true);

  });
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

  //it('should set correct classes for task', async () => {

  // const TaskCardNew = {
  //   props: ['task.color'],
  //   template: '<div>{{task.color}}</div>'
  // }
  //----------TEST TRIAL ---------------
  // const wrapper = mount(TaskCard, {
  //   propsData: {
  //     color: '',
  //   },
  // })
  //   await wrapper.setData({color: this.propsData.testcolor })
  //     expect(wrapper.text()).toBe('purple');
  // });

  //-----------------Only Taskcard colour class controll ------------
  describe('TaskCard.vue', () => {
    it('checks color class', async () => {
      const wrapper = mount(TaskCard, { //mount joooksutab task cardi etteantud andmetega läbi
        propsData: {
          task: {
            color: 'RED'
          },
        },
      });
      //const color = 'GRAY';
      //await wrapper.setProps({ task: { color } });

      const divs = wrapper.findAll('div'); //find all divs
      const div = divs.at(0); // takes first div

      expect(div.classes()).toContain('border-red-400');
    });
  });
  //-----If color is changed to gray, expected new taskColour value and class to be gray ------
  describe('TaskCard.vue', () => {
    it('checks color class', async () => {
      const wrapper = mount(TaskCard, { //mount runs task card with given data
        propsData: {
          task: {
            color: 'RED'
          },
        },
      });
      const color = 'GRAY';
      await wrapper.setProps({ task: { color } });

      expect(wrapper.vm.task.color).toContain('GRAY'); //vm  = view model - allows to access data inside wrapper

      const divs = wrapper.findAll('div'); //find all divs
      const div = divs.at(0); // takes first div

      expect(div.classes()).toContain('border-gray-400');
    });

    //-------------DATE FORMAT---------------
    it('should display date in correct format', () => {
      const wrapper = mount(TaskCard, {
        propsData: {
          task: {
            date: new Date('2021-04-29T17:20:37.603+00:00'),
            color: ''
          },
        },
      });
      // //------------find all spans-----------------
      // let span = wrapper.find('span');
      // expect(span.text()).toBe('29.04.2021')

      //------------find date divs that cntain spans-----------------
      expect(wrapper.find('.date span').text()).toBe('29.04.2021');
    });

  });
});