import { shallowMount } from '@vue/test-utils'
import Badge from '@/components/Badge.vue'


describe("Badge.vue", () => {
  const wrapper = shallowMount(Badge);

  test("checks if badge compnent contains class named test", () => {
    expect(wrapper.contains('.test')).toBe(true);
});
})