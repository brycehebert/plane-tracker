import Bottleneck from "bottleneck";

const limiter = new Bottleneck({maxConcurrent: 2});

export default limiter;