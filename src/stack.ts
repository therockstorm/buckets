import { BlockPublicAccess, Bucket, BucketEncryption } from "@aws-cdk/aws-s3"
import {
  App,
  Construct,
  RemovalPolicy,
  Stack,
  StackProps,
  Tag
} from "@aws-cdk/core"
import { name } from "../package.json"

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.createPrivate("RockyDev", "rocky.dev")
    this.createPrivate("WwwRockyDev", "www.rocky.dev")
  }

  private createPrivate = (id: string, bucketName: string) =>
    new Bucket(this, id, {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName,
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.RETAIN
    })
}

const app = new App()
const stack = new MyStack(app, `${name}-stack`)
stack.node.applyAspect(new Tag("Creator", "serverless"))
stack.node.applyAspect(new Tag("Project", name))
stack.node.applyAspect(new Tag("Stage", process.env.STAGE || ""))
