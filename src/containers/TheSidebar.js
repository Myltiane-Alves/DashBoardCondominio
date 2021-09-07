import React from 'react'

import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {

  return (
    <CSidebar >
      <img src="/homelogo.png" className="mt-2 mb-3 ml-auto mr-auto" width="70%" />
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
 
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
