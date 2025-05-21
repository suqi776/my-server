import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Router } from 'express'

const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取 JSON 数据（可放入项目根目录或 data 目录）
const dataPath = path.resolve(__dirname, '../db/tang.json')
const raw = fs.readFileSync(dataPath, 'utf-8')
const poems = JSON.parse(raw)

// 提取所有唯一标签
const tagSet = new Set<string>()
for (const poem of poems) {
  if (Array.isArray(poem.tags)) {
    poem.tags.forEach(tag => tagSet.add(tag))
  }
}
const allTags = Array.from(tagSet).sort()

// 提取所有唯一作者
const authorSet = new Set<string>()
for (const poem of poems) {
  if (poem.author) {
    authorSet.add(poem.author)
  }
}
const authors = Array.from(authorSet).sort()

// 获取所有标签
// GET /api/tags
router.get('/tags', (req, res) => {
  res.json({
    total: allTags.length,
    tags: allTags,
  })
})

// 获取所有作者
// GET /api/authors
router.get('/authors', (req, res) => {
  res.json({
    total: authors.length,
    authors,
  })
})

// 根据作者获取诗
// GET /api/poems/author/:author
router.get('/poems/author/:author', (req, res) => {
  const { author } = req.params
  const filteredPoems = poems.filter(poem => poem.author === author)
  res.json({
    total: filteredPoems.length,
    poems: filteredPoems,
  })
})

// 根据标签获取诗
// GET /api/poems/tag/:tag
router.get('/poems/tag/:tag', (req, res) => {
  const { tag } = req.params
  const filteredPoems = poems.filter(poem =>
    Array.isArray(poem.tags) && poem.tags.includes(tag),
  )
  res.json({
    total: filteredPoems.length,
    poems: filteredPoems,
  })
})

// 根据标题获取诗
// GET /api/poems/title/:title
router.get('/poems/title/:title', (req, res) => {
  const { title } = req.params
  const filteredPoems = poems.filter(poem => poem.title === title)
  res.json({
    total: filteredPoems.length,
    poems: filteredPoems,
  })
})

// 随机获取一首诗
// GET /api/poems/random
router.get('/poems/random', (req, res) => {
  if (!Array.isArray(poems) || poems.length === 0) {
    return res.status(500).json({ error: '诗词数据未加载或为空' })
  }

  const randomIndex = Math.floor(Math.random() * poems.length)
  const randomPoem = poems[randomIndex]

  res.json(randomPoem)
})

// 获取所有诗
// GET /api/poems
router.get('/poems', (req, res) => {
  res.json({
    total: poems.length,
    poems,
  })
})

export default router
