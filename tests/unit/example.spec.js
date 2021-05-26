const { shallowMount } = require("@vue/test-utils");
const Badge = require("../../src/components/Badge.vue");

describe("Badge.vue", () => {
  const wrapper = shallowMount(Badge);

  test("checks if badge compnent contains class named test", () => {
    expect(wrapper.contains(".test")).toBe(true);
  });

  // describe("Badge.vue", () => {
  //   it("should set correct classes for task", async () => {
  //     // set custom task object to propsData
  //     const color = "pink";
  //     const wrapper = mount(Badge, {
  //       propsData: {
  //         color,
  //       },
  //     });
  //     // check if wrapper has correct color class (for example purple task has to have border-purple-400 class)
  //     await wrapper.setData({
  //       class: "border-" + this.color.toLowerCase() + "-400",
  //     });
  //     expect(wrapper.classes()).toBe("border-pink-400");
  //   });
  //   // it("should display date in correct format", async () => {
  //   // set custom task object to propsData
  //   // check if date element has correct text
  //   // });
  // });

  // // describe('HelloWorld.vue', () => {
  // //   it('renders props.msg when passed', () => {
  // //     // const msg = 'new message'
  // //     const data = this.props.color.default
  // //     const wrapper = shallowMount(Badge, {

  // //       propsData: { data }
  // //     })
  // //     expect(wrapper.text()).toMatch(data)
  // //   })
  // // })
  // // describe('TaskCard.vue', () => {

  // //   it('should set correct classes for task', async () => {

  // //     // set custom task object to propsData

  // //     // check if wrapper has correct color class (for example purple task has to have border-purple-400 class)

  // //   })

  // //   it('should display date in correct format', async () => {

  // //     // set custom task object to propsData

  // //     // check if date element has correct text

  // //   })
});
