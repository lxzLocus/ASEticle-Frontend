export const data = [
    {
        "url": "https://arxiv.org/abs/2403.00448",
        "title": "When Large Language Models Confront Repository-Level Automatic Program Repair: How Well They Done?",
        "author": "Yuxiao Chen, Jingzheng Wu, Xiang Ling, Changjiang Li, Zhiqing Rui, Tianyue Luo, Yanjun Wu",
        "conference": "2024 IEEE/ACM 46th International Conference on Software Engineering: Companion Proceedings (ICSE-Companion)",
        "pages": 13,
        "date": "240301",
        "abstract": "In recent years, large language models (LLMs) have demonstrated substantial potential in addressing automatic program repair (APR) tasks. However, the current evaluation of these models for APR tasks focuses solely on the limited context of the single function or file where the bug is located, overlooking the valuable information in the repository-level context. This paper investigates the performance of popular LLMs in handling repository-level repair tasks. We introduce RepoBugs, a new benchmark comprising 124 typical repository-level bugs from open-source repositories. Preliminary experiments using GPT3.5 based on the function where the error is located, reveal that the repair rate on RepoBugs is only 22.58%, significantly diverging from the performance of GPT3.5 on function-level bugs in related studies. This underscores the importance of providing repository-level context when addressing bugs at this level. However, the repository-level context offered by the preliminary method often proves redundant and imprecise and easily exceeds the prompt length limit of LLMs. To solve the problem, we propose a simple and universal repository-level context extraction method (RLCE) designed to provide more precise context for repository-level code repair tasks. Evaluations of three mainstream LLMs show that RLCE significantly enhances the ability to repair repository-level bugs. The improvement reaches a maximum of 160% compared to the preliminary method. Additionally, we conduct a comprehensive analysis of the effectiveness and limitations of RLCE, along with the capacity of LLMs to address repository-level bugs, offering valuable insights for future research.",
        "cite_num": 3,
        "submitted": true,
        "relevant_no": 1,
        "tier": 5
    },
    {
        "url": "https://arxiv.org/abs/2406.05621",
        "title": "Cross Language Soccer Framework: An Open Source Framework for the RoboCup 2D Soccer Simulation",
        "author": "Nader Zare, Aref Sayareh, Alireza Sadraii, Arad Firouzkouhi, Amilcar Soares",
        "conference": null,
        "pages": 12,
        "date": "240609",
        "abstract": "RoboCup Soccer Simulation 2D (SS2D) research is hampered by the complexity of existing Cpp-based codes like Helios, Cyrus, and Gliders, which also suffer from limited integration with modern machine learning frameworks. This development paper introduces a transformative solution a gRPC-based, language-agnostic framework that seamlessly integrates with the high-performance Helios base code. This approach not only facilitates the use of diverse programming languages including CSharp, JavaScript, and Python but also maintains the computational efficiency critical for real time decision making in SS2D. By breaking down language barriers, our framework significantly enhances collaborative potential and flexibility, empowering researchers to innovate without the overhead of mastering or developing extensive base codes. We invite the global research community to leverage and contribute to the Cross Language Soccer (CLS) framework, which is openly available under the MIT License, to drive forward the capabilities of multi-agent systems in soccer simulations.",
        "cite_num": 0,
        "submitted": false,
        "relevant_no": 3,
        "tier": 2
    },
    {
        "url": "https://arxiv.org/abs/2404.05598",
        "title": "Hook-in Privacy Techniques for gRPC-based Microservice Communication",
        "author": "Louis Loechel, Siar-Remzi Akbayin, Elias Gr\u00fcnewald, Jannis Kiesel, Inga Strelnikova, Thomas Janke, Frank Pallas",
        "conference": "15 pages, accepted for the ICWE, International Conference on Web Engineering, 2024, research paper",
        "pages": 15,
        "date": "240408",
        "abstract": "gRPC is at the heart of modern distributed system architectures. Based on HTTP/2 and Protocol Buffers, it provides highly performant, standardized, and polyglot communication across loosely coupled microservices and is increasingly preferred over REST- or GraphQL-based service APIs in practice. Despite its widespread adoption, gRPC lacks any advanced privacy techniques beyond transport encryption and basic token-based authentication. Such advanced techniques are, however, increasingly important for fulfilling regulatory requirements. For instance, anonymizing or otherwise minimizing (personal) data before responding to requests, or pre-processing data based on the purpose of the access may be crucial in certain usecases. In this paper, we therefore propose a novel approach for integrating such advanced privacy techniques into the gRPC framework in a practically viable way. Specifically, we present a general approach along with a working prototype that implements privacy techniques, such as data minimization and purpose limitation, in a configurable, extensible, and gRPC-native way utilizing a gRPC interceptor. We also showcase how to integrate this contribution into a realistic example of a food delivery use case. Alongside these implementations, a preliminary performance evaluation shows practical applicability with reasonable overheads. Altogether, we present a viable solution for integrating advanced privacy techniques into real-world gRPC-based microservice architectures, thereby facilitating regulatory compliance ``by design''.",
        "cite_num": 0,
        "submitted": true,
        "relevant_no": 7,
        "tier": 1
    },
    {
        "abstract": "State-of-the-art neural language models can now be used to solve ad-hoc language tasks through zero-shot \n<italic xmlns:mml=\"http://www.w3.org/1998/Math/MathML\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">prompting</i>\n without the need for supervised training. This approach has gained popularity in recent years, and researchers have demonstrated prompts that achieve strong accuracy on specific NLP tasks. However, finding a prompt for new tasks requires experimentation. Different prompt templates with different wording choices lead to significant accuracy differences. PromptIDE allows users to experiment with prompt variations, visualize prompt performance, and iteratively optimize prompts. We developed a workflow that allows users to first focus on model feedback using small data before moving on to a large data regime that allows empirical grounding of promising prompts using quantitative measures of the task. The tool then allows easy deployment of the newly created ad-hoc models. We demonstrate the utility of PromptIDE (demo: \n<uri xmlns:mml=\"http://www.w3.org/1998/Math/MathML\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">http://prompt.vizhub.ai</uri>\n) and our workflow using several real-world use cases.",
        "author": "Hendrik Strobelt, Albert Webson, Victor Sanh, Benjamin Hoover, Johanna Beyer, Hanspeter Pfister, Alexander M. Rush",
        "cite_num": 91,
        "conference": "IEEE",
        "date": "220903",
        "pages": 7,
        "relevant_no": 8,
        "submitted": true,
        "title": "Interactive and Visual Prompt Engineering for Ad-hoc Task Adaptation with Large Language Models",
        "url": "https://ieeexplore.ieee.org/abstract/document/9908590/",
        "tier": 4
    },
    {
        "abstract": "In this paper, an argument-based method of answering why-questions in Vietnamese is presented. This method is developed in different way from many approaches which use cue phrases of causal relation to find the answers for why-questions. In this method, the arguments is extracted firstly, then the causal part and consequential part of every argument are split in order to index the consequential part. When a why-question is asked, the asking information is extracted and used to search for the reason, then the reason is used to identify the paragraph which can be used to answer the question. For evaluation, an experiment with keyword-based information retrieval and simple argument collecting process is conducted to show the applicability of the method.",
        "author": "Chinh Trong Nguyen, Dang Tuan Nguyen",
        "cite_num": 1,
        "conference": "IEEE",
        "date": "161031",
        "pages": 13,
        "relevant_no": 9,
        "submitted": true,
        "title": "Towards an argument-based method for answering why-question in Vietnamese language",
        "url": "https://ieeexplore.ieee.org/document/7725637/",
        "tier": 3
    }
];

//export const data = JSON.stringify(input, null, 2);