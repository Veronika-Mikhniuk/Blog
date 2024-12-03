export function SortSelect({ onChange, value }) {
    return (
        <select
            className="form-select"
            onChange={(event) => onChange(event.target.value)}
            value={value}
            style={{ maxWidth: '150px', position: 'absolute', top: '0', right: '0' }}
        >
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="text">Content</option>
            <option value="lesson_num">Lesson Number</option>
        </select>
    )
}