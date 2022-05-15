import Bottleneck from "bottleneck";

const limiter = new Bottleneck({maxConcurrent: 3, minTime: 200});

export default limiter;