import TestimonialCard from "./TestimonialCard"

export default function Aside () {
    return (
        <aside>
            <section className="testimonials">
                <h2>Testimonials</h2>
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
            </section>
            <section className="about"></section>
        </aside>
    )
}

