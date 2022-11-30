import styles from './tags.module.scss'

interface ITagsProps {
  strTags: string | null
}

const Tags = ({ strTags }: ITagsProps) => {
  return (
    <ul className={styles.tagBox}>
      {strTags?.split(',').map((tag, iTag) => {
        const tagKey = `tag-${iTag}`
        return (
          <li key={tagKey} className={styles.tag}>
            {tag}
          </li>
        )
      })}
    </ul>
  )
}

export default Tags
