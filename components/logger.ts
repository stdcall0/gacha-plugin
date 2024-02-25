type Log = (...args: any[]) => void;

interface ILogger {
    trace: Log;
    debug: Log;
    info: Log;
    warn: Log;
    error: Log;
    fatal: Log;
    mark: Log;
};

// @ts-ignore
const Logger = logger as ILogger;

export default Logger;
