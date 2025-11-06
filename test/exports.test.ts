import { fileURLToPath } from 'node:url'
import { expect, it } from 'vitest'
import { getPackageExportsManifest } from 'vitest-package-exports'

it('exports snapshot', async () => {
  const manifest = await getPackageExportsManifest({
    importMode: 'package',
    cwd: fileURLToPath(import.meta.url),
  })

  expect(manifest.exports).toMatchSnapshot()
})
