import { BsLinkedin } from "react-icons/bs";

const About = () => {
  return (
    <div>
      <section>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6">
              <h2 className="font-monospace">About The Developer</h2>
              <h3 className="text-lg font-semibold">Hi, I'm Mikail Khan</h3>
              <p className="mt-2">
                I'm a software engineer, lifelong learner, and builder of cool
                web apps that make everyday life easier. I created Walert.pk to
                help people shop smarter — to remove the guesswork and put
                savings within reach.
              </p>
              <p className="mt-1 text-sm">
                When I'm not writing code I enjoy reading about product design,
                experimenting with new web tools, and helping others build
                practical projects.
              </p>
              <p className="mt-4 text-sm ">
                <span className="me-2" style={{ color: "#0866C2" }}>
                  <BsLinkedin className="text-blue me-1" />
                  LinkedIn:
                </span>

                <a
                  href="https://www.linkedin.com/in/mikailkhan1/"
                  target="_blank"
                >
                  linkedin.com/in/mikailkhan1/
                </a>
              </p>
            </div>
            <div className="col-md-6 py-12">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-2xl font-bold">
                  Ready to save on your next purchase?
                </h2>
                <p className="mt-2 text-gray-700">
                  Send the product link to our WhatsApp and we'll start tracking
                  it for you right away.
                </p>

                <div className="mt-6 flex justify-center">
                  <a
                    href="https://wa.me/923352501007?text=https://hello.com"
                    className="inline-block rounded-2xl px-6 py-3 btn btn-success text-white font-medium shadow"
                    target="_blank"
                  >
                    Message us on WhatsApp
                  </a>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Phone: +92 335 2501007
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12"></section>
    </div>
  );
};

export default About;
