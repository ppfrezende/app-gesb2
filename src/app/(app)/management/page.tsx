import { TabPanel, TabPanels } from '@/app/components/chakraui'

export default function ManagementPage() {
  return (
    <>
      <TabPanels>
        <TabPanel>
          <h1>Intevenção</h1>
        </TabPanel>
        <TabPanel>
          <h1>PO</h1>
        </TabPanel>
        <TabPanel>
          <h1>Site</h1>
        </TabPanel>
      </TabPanels>
    </>
  )
}
