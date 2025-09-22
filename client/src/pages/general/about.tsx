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

            <div className="col-md-6 col-sm-5 mx-auto">
              <div className="row mx-0">
                <div className="bg-success text-white rounded my-3 p-5">
                  <h2 className="display-5 text-center">What is Walert?</h2>
                  <ul className="lead">
                    <li>Walert is your smart price-tracking companion!</li>
                    <li>
                      That helps you shop wisely, save money, and stay within
                      budget.
                    </li>
                    <li>
                      With powerful features like price tracking and drop
                      alerts, you'll always know the best time to buy your
                      favorite products.
                    </li>
                    <li>
                      Get notified instantly, grab the best deals, and become a
                      savvy shopper with Walert.pk.
                    </li>
                  </ul>
                </div>
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
