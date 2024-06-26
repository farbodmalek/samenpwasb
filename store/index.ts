import sideBarItems from './data/sidebarItems';
import {defineStore} from 'pinia'

export const useStore = defineStore('main', () => {
  const sidebarItems = reactive(sideBarItems)
  const isSidebarActive = ref(true)
  const closemodal =ref(false)

  const toggleSidebar = () => isSidebarActive.value = !isSidebarActive.value
  const closemodalexite = () => closemodal.value = !closemodal.value

  const closeSidebar = () => isSidebarActive.value = false
  const openSidebar = () => isSidebarActive.value = true


  return {
    sidebarItems,
    isSidebarActive,
    closemodal,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    closemodalexite
  }
})
