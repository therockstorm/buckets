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

    // tslint:disable-next-line
    new Bucket(this, "RockyDev", {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName: "rocky.dev",
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.RETAIN
    })

    // tslint:disable-next-line
    new Bucket(this, "WwwRockyDev", {
      blockPublicAccess: new BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: true,
        ignorePublicAcls: false,
        restrictPublicBuckets: true
      }),
      bucketName: "www.rocky.dev",
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.RETAIN
    })
  }
}

const app = new App()
const stack = new MyStack(app, `${name}-stack`)
stack.node.applyAspect(new Tag("Project", name))
stack.node.applyAspect(new Tag("Creator", "serverless"))
