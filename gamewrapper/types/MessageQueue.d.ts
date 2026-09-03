type AnyResolver = (value?: any | PromiseLike<any>) => any;
type MessageHandler = () => Promise<any>;
export declare class MessageQueue {
    protected queue: MessageHandler[];
    protected queuePromise: Promise<any>;
    queueMessage(messageHandler: MessageHandler): Promise<any>;
    protected processQueue(resolve: AnyResolver): void;
}
export {};
