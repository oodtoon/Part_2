const Courses = ({ courses }) => {
    return (
        <>
            {courses.map((course) => {
                return (
                    <div key={course.id}>
                        <Header title={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            })
            }

        </>
    )
}


const Header = ({ title }) => {
    return (
        <h1 key={title}>{title}</h1>
    )
}


const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <h4>total of {total} exercises</h4>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )

}


const Content = ({ parts }) => (
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </>
)

export default Courses;