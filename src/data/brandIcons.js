// Brand marks for the certification issuers, sourced from `simple-icons`
// (MIT-licensed icon *code*; the marks themselves remain trademarks of
// their respective owners — same basis most "certified by" badges rely
// on). AWS, Microsoft Azure, DeepLearning.AI, and EC-Council aren't part
// of that open-source set (AWS and Azure specifically are excluded from
// simple-icons over brand-guideline concerns), so those four fall back to
// a plain monogram badge in the ticker instead of a missing icon.
import {
  siGooglecloud,
  siKubernetes,
  siNvidia,
  siHashicorp,
  siDatabricks,
  siApachekafka,
} from 'simple-icons'

const RAW = {
  googlecloud: siGooglecloud,
  kubernetes: siKubernetes,
  nvidia: siNvidia,
  hashicorp: siHashicorp,
  databricks: siDatabricks,
  apachekafka: siApachekafka,
}

export function getBrandIcon(key) {
  const icon = RAW[key]
  if (!icon) return null
  return { path: icon.path, title: icon.title, hex: `#${icon.hex}` }
}
