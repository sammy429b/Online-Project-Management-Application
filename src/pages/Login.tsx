
function Login() {
    return (
        <>
            <div>
                <div>
                    <form action="">
                        <div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                    <span className="label-text-alt"></span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                <div className="label">
                                    <span className="label-text-alt">Email is required</span>
                                    <span className="label-text-alt"></span>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                    <span className="label-text-alt"></span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                <div className="label">
                                    <span className="label-text-alt">Password is required</span>
                                    <span className="label-text-alt">Forgot Password?</span>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default Login