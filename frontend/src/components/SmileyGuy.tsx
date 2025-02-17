import React from "react";
import maskImage from "../assets/Mask4group3.png";

const SmileyGuy: React.FC = () => {
    return (
        <>
        <section className="featured-posts py-12">
        <div className="container mx-auto px-4">
        <div className="main-content">
            <div className="row listfeaturedtag">
            <div className="col-sm-12">
                <div className="card">
                <div
                    className="flex flex-col md:flex-row bg-[#f3f9ea] p-0"
                    style={{ backgroundColor: "#f3f9ea", padding: "0px" }}
                >
                    {/* Text Content */}
                    <div className="flex-1 p-6">
                    <h2
                        className="text-[#05212f] leading-[50px] font-raleway font-bold text-3xl md:text-4xl"
                        style={{
                        color: "#05212f",
                        lineHeight: "50px",
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        }}
                    >
                        Ready to make more money promoting quality products to
                        an international audience?
                    </h2>
                    <br />
                    <p className="font-raleway text-gray-700">
                        Create your PromptEarn account in less than 5 minutes
                        and start earning
                    </p>
                    <br />
                    <div className="flex flex-col md:flex-row gap-4">
                        <a
                        id="btn11xx"
                        href="/register"
                        className="bg-purple-800 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#218838] transition duration-300"
                        >
                        Create account
                        </a>
                        <a
                        id="btn22xx"
                        href="#"
                        className="bg-purple-800 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#218838] transition duration-300"
                        >
                        Watch live demo first
                        </a>
                    </div>
                    </div>

                    {/* Image */}
                    <div className="flex-1">
                    <img
                        src={maskImage}
                        alt="Promotional Banner"
                        className="w-full max-w-[500px] rounded-lg shadow-lg"
                    />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        </section>
        </>  
    );
};

export default SmileyGuy;